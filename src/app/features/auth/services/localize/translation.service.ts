import { inject, Injectable, Signal } from '@angular/core';
import { TranslationWrapperService } from '@core/services/localize/translation.wrapper.service';
import { APP_TRANSLATION_KEYS } from '@features/auth/services/localize/translation.keys';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private translate = inject(TranslationWrapperService);
  KEYS = APP_TRANSLATION_KEYS;

  title(): Signal<string> {
    return this.translate.t(this.KEYS.TITLE);
  }

  subtitle(): Signal<string> {
    return this.translate.t(this.KEYS.SUBTITLE);
  }

  mailLabel(): Signal<string> {
    return this.translate.t(this.KEYS.MAIL);
  }

  passwordLabel(): Signal<string> {
    return this.translate.t(this.KEYS.PASSWORD);
  }

  formConfirmation(): Signal<string> {
    return this.translate.t(this.KEYS.CONFIRMATION);
  }

  successReport(): Signal<string> {
    return this.translate.t(this.KEYS.SUCCESS);
  }

  processReset(): Signal<string> {
    return this.translate.t(this.KEYS.RESET);
  }

  linkExpired(): Signal<string> {
    return this.translate.t(this.KEYS.LINK_EXPIRED);
  }

  errorTimeout(): Signal<string> {
    return this.translate.t(this.KEYS.ERROR.TIMEOUT);
  }

  mailRequired(): Signal<string> {
    return this.translate.t(this.KEYS.ERROR.MAIL.REQUIRED);
  }

  mailWrong(): Signal<string> {
    return this.translate.t(this.KEYS.ERROR.MAIL.WRONG);
  }

  passwordRequired(): Signal<string> {
    return this.translate.t(this.KEYS.ERROR.PASSWORD.REQUIRED);
  }

  passwordWrong(): Signal<string> {
    return this.translate.t(this.KEYS.ERROR.PASSWORD.WRONG);
  }

  passwordRuleNumber(): Signal<string> {
    return this.translate.t(this.KEYS.PASSWORD_RULES.NUMBER);
  }

  passwordRuleSpecialChars(): Signal<string> {
    return this.translate.t(this.KEYS.PASSWORD_RULES.SPECIAL_CHARS);
  }

  passwordRuleUppercase(): Signal<string> {
    return this.translate.t(this.KEYS.PASSWORD_RULES.UC_CHARS);
  }

  passwordRuleMinLength(minLength: number): Signal<string> {
    return this.translate.t(this.KEYS.PASSWORD_RULES.MIN_LENGTH, {
      pwdLength: minLength,
    });
  }

  accountQuestion(): Signal<string> {
    return this.translate.t(this.KEYS.QUESTION);
  }

  signInExclamation(): Signal<string> {
    return this.translate.t(this.KEYS.EXCLAMATION);
  }

  errorFailed(): Signal<string> {
    return this.translate.t(this.KEYS.ERROR.FAILED);
  }

  authError(errMssg: string) {
    return this.translate.t(this.KEYS.AUTH_ERROR, {
      errMssg: errMssg,
    });
  }
}
