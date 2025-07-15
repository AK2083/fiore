import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { scopedLoggerFactory } from '@core/utils/logging/scope.logger.factory';
import { SupabaseService } from '../supabase/supabase.service';
import {
  DisplayType,
  UserMessage,
} from '@core/models/messages/user.message.model';
import { RedirectException } from '@features/auth/models/error/redirectException';
import { TranslationService } from '../localize/translation.service';

@Injectable({
  providedIn: 'root',
})
export class RedirectService {
  private router = inject(Router);
  private translationService = inject(TranslationService);
  private loggerService = scopedLoggerFactory(SupabaseService);

  redirectByType(redirectType: string) {
    this.loggerService.log('Redirection type:', redirectType);

    switch (redirectType) {
      case 'signup':
      case 'email_otp':
        this.loggerService.log('Register successful');
        return {
          title: 'Register successful',
          message: this.translationService.successReport()(),
          details: { ['REDIRECT_SUCCESS']: '' },
          code: 'REDIRECT_SUCCESS',
          displayType: DisplayType.Inline,
          severity: 'info',
        } as UserMessage;
      case 'recovery':
        this.loggerService.log('Set password reset');
        this.redirect('/reset-password-form');
        return {
          title: 'Reset password',
          message: 'Das Passwort wurde zurückgesetzt',
          details: { ['REDIRECT_RESET']: '' },
          code: 'REDIRECT_RESET',
          displayType: DisplayType.Inline,
          severity: 'info',
        } as UserMessage;
      default:
        this.loggerService.warn(
          'Unknown redirection type, redirecting to /auth.',
          redirectType,
        );
        this.redirect('/auth');
        throw new RedirectException({
          title: 'Unbekannter Link',
          message: 'Eine unbekannte Seite. Bitte versuchen Sie es erneut.',
          details: { ['REDIRECT_UNKNOWN']: redirectType },
          code: 'REDIRECT_UNKNOWN',
          displayType: DisplayType.Inline,
          severity: 'danger',
        });
    }
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
