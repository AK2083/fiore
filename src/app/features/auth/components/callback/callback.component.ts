import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ScopedLogger } from '@core/utils/logging/scope.logger';
import { scopedLoggerFactory } from '@core/utils/logging/scope.logger.factory';
import { CallbackTranslation } from '@features/auth/models/localize/callback.translation';
import { TranslationService } from '@features/auth/services/localize/translation.service';
import { SupabaseService } from '@features/auth/services/supabase/supabase.service';
import { HintComponent } from '@shared/components/misc/hint/hint.component';
import { AuthError } from '@supabase/supabase-js';

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
  private router = inject(Router);

  translations = {
    message: signal(''),
  } as CallbackTranslation;

  severity: 'danger' | 'warning' | 'info' = 'info';
  params: URLSearchParams = new URLSearchParams();

  async ngOnInit() {
    this.loggerService.log('ngOnInit: CallbackComponent initialized.');

    try {
      this.setParameter();
    } catch (error) {
      if (error instanceof AuthError) {
        this.loggerService.error(
          'AuthError caught during parameter parsing',
          error,
        );
        this.setCommonError(error);
      } else {
        this.loggerService.error(
          'Unknown error during parameter parsing',
          error,
        );
      }
    } finally {
      this.setClearHistory();
      this.loggerService.log('Browser history cleaned up.');
    }
  }

  setParameter() {
    const hash = window.location.hash.substring(1);
    this.params = new URLSearchParams(hash);

    this.loggerService.log('Extracted URL hash params', this.params.toString());

    if (this.params.get('access_token') && this.params.get('refresh_token')) {
      this.loggerService.log(
        'Access + Refresh token found, setting session...',
      );
      this.supabase.setSession(
        this.params.get('access_token') ?? '',
        this.params.get('refresh_token') ?? '',
      );
      this.redirectByType();
    } else {
      this.loggerService.warn(
        'No tokens found – assuming expired or invalid link.',
      );
      this.setLinkExpired();
    }
  }

  redirectByType() {
    const type = this.params.get('type');
    this.loggerService.log('Redirection type:', type);

    switch (type) {
      case 'signup':
      case 'email_otp':
        this.loggerService.log('Register successful');
        this.setRegisterSuccessful();
        break;
      case 'recovery':
        this.loggerService.log('Set password reset');
        this.setPasswordResetProcessed();
        break;
      default:
        this.loggerService.warn(
          'Unknown redirection type, redirecting to /auth.',
        );
        this.redirect('/auth');
        break;
    }
  }

  setClearHistory() {
    window.history.replaceState(
      null,
      '',
      window.location.pathname + window.location.search,
    );
  }

  setHint(message: Signal<string>, severity: 'danger' | 'warning' | 'info') {
    this.translations.message = message;
    this.severity = severity;
    this.loggerService.log('Set hint with severity', severity);
  }

  setCommonError(error: AuthError) {
    this.setHint(this.translationService.authError(error.message), 'danger');
  }

  setLinkExpired() {
    this.setHint(this.translationService.linkExpired(), 'danger');
  }

  setPasswordResetProcessed() {
    this.setHint(this.translationService.processReset(), 'info');
    this.redirect('/reset-password-form');
  }

  setRegisterSuccessful() {
    this.setHint(this.translationService.successReport(), 'info');
  }

  redirect(redirectTo: string) {
    const redirectInMilliSeconds = 3000;
    this.loggerService.log(
      'Redirecting to ',
      `${redirectTo} in ${redirectInMilliSeconds}ms`,
    );

    setTimeout(() => {
      this.router.navigate([redirectTo]);
    }, redirectInMilliSeconds);
  }
}
