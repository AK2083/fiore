import { computed } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { FormControl } from "@angular/forms";

export class PasswordUtils {
  private passwordValue;
  public rules;
  public allRulesValid;

  MINPASSWORDLENGTH = 8;

  constructor(public pwdControl: FormControl<string | null>) { 
    this.passwordValue = toSignal(this.pwdControl.valueChanges, { initialValue: '' });

    this.rules = computed(() => {
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
}
