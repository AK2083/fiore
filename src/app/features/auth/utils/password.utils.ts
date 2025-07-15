import { computed } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { FormControl } from "@angular/forms";
import { PasswordRules } from "@features/auth/models/passwordRules";

export class PasswordUtils {
  private passwordValue;
  public rules;
  public allRulesValid;

  MINPASSWORDLENGTH = 8;

  constructor(public pwdControl: FormControl<string | null>) { 
    this.passwordValue = toSignal(this.pwdControl.valueChanges, { initialValue: '' });

    this.rules = computed<PasswordRules>(() => {
      const value = this.passwordValue() || ''; 
      return {
        minLength: this.isLengthValid(value),
        hasUpperCase: this.hasUpperCase(value),
        hasNumber: this.hasNumber(value),
        hasSpecialChar: this.hasSpecialChars(value),
      };
    });

    this.allRulesValid = computed(() => {
      return Object.values(this.rules()).every(Boolean);
    });
  }

  isLengthValid(password: string) {
    return password.length >= this.MINPASSWORDLENGTH;
  }

  hasUpperCase(password: string) {
    const regexUpperCase = /[A-Z]/;
    return regexUpperCase.test(password);
  }

  hasNumber(password: string) {
    const regexNumber = /\d/;
    return regexNumber.test(password);
  }

  hasSpecialChars(password: string) {
    const regexSpecialChars = /[°"@!%*?&§/()=?`´+*~'#,.\-;:_<>|]/;
    return regexSpecialChars.test(password);
  }

  getErrorCode() {
    let errorCode = 'PASSWORD_VALIDATION_FAILED';
    const failedCodeRule = this.getFailedFirstRule();

    if (failedCodeRule) {
      errorCode = `PASSWORD_RULE_${failedCodeRule.toUpperCase()}_FAILED`;
    } else {
      errorCode = 'PASSWORD_RULES_GENERIC_FAILED';
    }

    return errorCode;
  }

  private getFailedFirstRule(): string | undefined {
    const passwordRuleDetails = this.rules();

    return Object.keys(passwordRuleDetails).find(
      (key) => !passwordRuleDetails[key as keyof PasswordRules],
    );
  }
}
