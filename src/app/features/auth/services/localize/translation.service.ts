import { inject, Injectable, Signal } from '@angular/core';
import { TranslationWrapperService } from '@core/services/translation/translation.wrapper.service';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private translate = inject(TranslationWrapperService);

  registerTitle(): Signal<string> {
    return this.translate.t('app.register.title');
  }

  registerSubtitle(): Signal<string> {
    return this.translate.t('app.register.subtitle');
  }

  registerMailLabel(): Signal<string> {
    return this.translate.t('app.register.mail');
  }

  registerPasswordLabel(): Signal<string> {
    return this.translate.t('app.register.password');
  }

  registerConfirmation(): Signal<string> {
    return this.translate.t('app.register.confirmation');
  }

  registerSuccess(): Signal<string> {
    return this.translate.t('app.register.success');
  }

  registerReset(): Signal<string> {
    return this.translate.t('app.register.reset');
  }

  registerLinkExpired(): Signal<string> {
    return this.translate.t('app.register.linkExpired');
  }

  registerErrorTimeout(): Signal<string> {
    return this.translate.t('app.register.error.timeout');
  }

  registerMailRequired(): Signal<string> {
    return this.translate.t('app.register.error.mail.required');
  }

  registerMailWrong(): Signal<string> {
    return this.translate.t('app.register.error.mail.wrong');
  }
  
  registerPasswordRequired(): Signal<string> {
    return this.translate.t('app.register.error.password.required');
  }

  registerPasswordWrong(): Signal<string> {
    return this.translate.t('app.register.error.password.wrong');
  }

  registerPasswordNumber(): Signal<string> {
    return this.translate.t('app.register.passwordRules.number');
  }

  registerPasswordSpecialChars(): Signal<string> {
    return this.translate.t('app.register.passwordRules.specialChars');
  }

  registerPasswordUppercase(): Signal<string> {
    return this.translate.t('app.register.passwordRules.ucChars');
  }

  registerPasswordMinLength(minLength: number): Signal<string> {
    return this.translate.t('app.register.passwordRules.minLength', { pwdLength: minLength });
  }

  registerQuestion(): Signal<string> {
    return this.translate.t('app.register.question');
  }

  registerExclamation(): Signal<string> {
    return this.translate.t('app.register.exclamation');
  }

  registerErrorFailed(): Signal<string> {
    return this.translate.t('app.register.error.failed');
  }
}
