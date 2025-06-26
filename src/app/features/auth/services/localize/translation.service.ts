import { inject, Injectable, Signal } from '@angular/core';
import { TranslationWrapperService } from '@core/services/translation/translation.wrapper.service';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private translate = inject(TranslationWrapperService);

  title(): Signal<string> {
    return this.translate.t('app.register.title');
  }

  subtitle(): Signal<string> {
    return this.translate.t('app.register.subtitle');
  }

  mailLabel(): Signal<string> {
    return this.translate.t('app.register.mail');
  }

  passwordLabel(): Signal<string> {
    return this.translate.t('app.register.password');
  }

  formConfirmation(): Signal<string> {
    return this.translate.t('app.register.confirmation');
  }

  successReport(): Signal<string> {
    return this.translate.t('app.register.success');
  }

  processReset(): Signal<string> {
    return this.translate.t('app.register.reset');
  }

  linkExpired(): Signal<string> {
    return this.translate.t('app.register.linkExpired');
  }

  errorTimeout(): Signal<string> {
    return this.translate.t('app.register.error.timeout');
  }

  mailRequired(): Signal<string> {
    return this.translate.t('app.register.error.mail.required');
  }

  mailWrong(): Signal<string> {
    return this.translate.t('app.register.error.mail.wrong');
  }

  passwordRequired(): Signal<string> {
    return this.translate.t('app.register.error.password.required');
  }

  passwordWrong(): Signal<string> {
    return this.translate.t('app.register.error.password.wrong');
  }

  passwordRuleNumber(): Signal<string> {
    return this.translate.t('app.register.passwordRules.number');
  }

  passwordRuleSpecialChars(): Signal<string> {
    return this.translate.t('app.register.passwordRules.specialChars');
  }

  passwordRuleUppercase(): Signal<string> {
    return this.translate.t('app.register.passwordRules.ucChars');
  }

  passwordRuleMinLength(minLength: number): Signal<string> {
    return this.translate.t('app.register.passwordRules.minLength', {
      pwdLength: minLength,
    });
  }

  accountQuestion(): Signal<string> {
    return this.translate.t('app.register.question');
  }

  signInExclamation(): Signal<string> {
    return this.translate.t('app.register.exclamation');
  }

  errorFailed(): Signal<string> {
    return this.translate.t('app.register.error.failed');
  }

  authError(errMssg: string) {
    return this.translate.t('app.register.authError', {
      errMssg: errMssg,
    });
  }
}
