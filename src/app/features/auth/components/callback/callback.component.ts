import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import {
  DisplayType,
  UserMessage,
} from '@core/models/messages/user.message.model';
import { ScopedLogger } from '@core/utils/logging/scope.logger';
import { scopedLoggerFactory } from '@core/utils/logging/scope.logger.factory';
import { RedirectException } from '@features/auth/models/error/redirectException';
import { SupabaseSessionException } from '@features/auth/models/error/supabaseSessionException';
import { CallbackTranslation } from '@features/auth/models/localize/callback.translation';
import { TranslationService } from '@features/auth/services/localize/translation.service';
import { RedirectService } from '@features/auth/services/redirection/redirect.service';
import { SupabaseService } from '@features/auth/services/supabase/supabase.service';
import { WindowHandlerService } from '@features/auth/services/window/window-handler.service';
import { HintComponent } from '@shared/components/misc/hint/hint.component';

@Component({
  selector: 'app-callback',
  imports: [HintComponent],
  templateUrl: './callback.component.html',
  providers: [
    {
      provide: ScopedLogger,
      useFactory: () => scopedLoggerFactory(CallbackComponent),
    },
  ],
})
export class CallbackComponent implements OnInit {
  private supabase = inject(SupabaseService);
  private translationService = inject(TranslationService);
  private loggerService = inject(ScopedLogger);
  private windowService = inject(WindowHandlerService);
  private redirectService = inject(RedirectService);

  translations = {
    message: signal(''),
  } as CallbackTranslation;

  severity: 'danger' | 'warning' | 'info' = 'info';
  params: URLSearchParams = new URLSearchParams();

  async ngOnInit() {
    this.loggerService.log('ngOnInit: CallbackComponent initialized.');
    this.setParameter();
  }

  setParameter() {
    this.params = this.windowService.getUrlSearchParams();
    this.loggerService.log('Extracted URL hash params', this.params.toString());

    try {
      if (this.areTokenExists()) {
        this.loggerService.log('Access + Refresh token found, setting session');
        this.setSupabaseSession();
        this.setMessage(
          this.redirectService.redirectByType(this.params.get('type') || ''),
        );
      } else {
        this.loggerService.warn(
          'No tokens found assuming expired or invalid link.',
        );
        this.setMessage({
          title: 'Invalid Link',
          message: this.translationService.linkExpired()(),
          details: { ['INVALID_LINK']: '' },
          code: 'INVALID_LINK',
          displayType: DisplayType.Inline,
          severity: 'warning',
        });
      }
    } catch (error: unknown) {
      this.loggerService.error('Error on redirect', error);
      if (
        error instanceof RedirectException ||
        error instanceof SupabaseSessionException
      )
        this.setMessage(error.userMessage);
    } finally {
      this.windowService.clearHistory();
      this.loggerService.log('Browser history cleaned up.');
    }
  }

  areTokenExists() {
    return this.params.get('access_token') && this.params.get('refresh_token');
  }

  setSupabaseSession() {
    this.supabase.setSession(
      this.params.get('access_token') ?? '',
      this.params.get('refresh_token') ?? '',
    );
  }

  setHint(message: Signal<string>, severity: 'danger' | 'warning' | 'info') {
    this.translations.message = message;
    this.severity = severity;
    this.loggerService.log('Set hint with severity', severity);
  }

  setMessage(msg: UserMessage) {
    this.setHint(signal(msg.message), msg.severity);
  }
}
