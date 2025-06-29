import { Component, computed, inject, signal } from '@angular/core';
import { HeaderComponent } from '@shared/components/misc/header/header.component';
import { SimplePanelComponent } from '@shared/components/misc/simple-panel/simple-panel.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { SupabaseService } from '@features/auth/services/supabase/supabase.service';
import { ErrorService, ErrorType } from '@core/services/error/error.service';
import { RegisterComponent } from '@shared/components/misc/icons/register.component';
import { LettercaseComponent } from '@shared/components/misc/icons/lettercase.component';
import { LockComponent } from '@shared/components/misc/icons/lock.component';
import { EyeOpenComponent } from '@shared/components/misc/icons/eye-open.component';
import { EyeCloseComponent } from '@shared/components/misc/icons/eye-close.component';
import { CircleComponent } from '@shared/components/misc/icons/circle.component';
import { InputFieldComponent } from '@shared/components/forms/input-field/input-field.component';
import { HintComponent } from '@shared/components/misc/hint/hint.component';
import { TranslationService } from '@features/auth/services/localize/translation.service';
import { RegisterTranslation } from '@features/auth/models/localize/register.translation';
import { LoggerService } from '@core/services/logging/logger.service';

@Component({
  selector: 'app-registration',
  imports: [
    NgIf,
    NgClass,
    ReactiveFormsModule,
    HeaderComponent,
    SimplePanelComponent,
    HintComponent,
    RegisterComponent,
    LettercaseComponent,
    LockComponent,
    EyeOpenComponent,
    EyeCloseComponent,
    CircleComponent,
    InputFieldComponent,
  ],
  templateUrl: './registration.component.html',
})
export class RegistrationComponent {
  private errorService = inject(ErrorService);
  private spbsService = inject(SupabaseService);
  private translationService = inject(TranslationService);
  private loggerService = inject(LoggerService);

  MINPWDLENGTH = 8;

  translations = {
    title: this.translationService.title(),
    subtitle: this.translationService.subtitle(),
    mail: this.translationService.mailLabel(),
    password: this.translationService.passwordLabel(),
    confirmation: this.translationService.formConfirmation(),
    success: this.translationService.successReport(),
    reset: this.translationService.processReset(),
    linkExpired: this.translationService.linkExpired(),
    timeout: this.translationService.errorTimeout(),
    failed: this.translationService.errorFailed(),
    mailRequired: this.translationService.mailRequired(),
    mailWrong: this.translationService.mailWrong(),
    passwordRequired: this.translationService.passwordRequired(),
    passwordWrong: this.translationService.passwordWrong(),
    passwordNumber: this.translationService.passwordRuleNumber(),
    passwordSpecialChars: this.translationService.passwordRuleSpecialChars(),
    passwordUppercase: this.translationService.passwordRuleUppercase(),
    passwordMinLength: this.translationService.passwordRuleMinLength(
      this.MINPWDLENGTH,
    ),
    question: this.translationService.accountQuestion(),
    exclamation: this.translationService.signInExclamation(),
  } as RegisterTranslation;

  isPasswordVisible = false;
  selectedEmailField = false;
  selectedPasswordField = false;
  isLoading = signal(false);
  showInfo = signal('');
  signUpCompleted = false;

  registrationForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  allRulesValid = false;
  currentError = computed(() => this.errorService.getLatestError());

  rules = {
    minLength: false,
    hasUpperCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  };

  COMPONENTNAME = '';

  constructor() {
    this.COMPONENTNAME = this.constructor.name;

    this.loggerService.log({
      scope: this.COMPONENTNAME,
      message: 'RegistrationComponent initialized',
    });

    this.pwdControl.valueChanges.subscribe((value) => {
      this.rules.minLength = value?.length >= this.MINPWDLENGTH;
      this.rules.hasUpperCase = /[A-Z]/.test(value);
      this.rules.hasNumber = /\d/.test(value);
      this.rules.hasSpecialChar = /[°"@!%*?&§/()=?`´+*~'#,.\-;:_<>|]+/.test(
        value,
      );

      this.allRulesValid = Object.values(this.rules).every(Boolean);
    });
  }

  async onSubmit() {
    this.logMe('Submit button clicked');

    if (!this.registrationForm.valid) {
      this.logMe('Form is invalid', this.registrationForm.errors);
      this.isLoading.update(() => false);
      return;
    }

    this.logMe('Proceeding with signup');
    await this.signUpWithLoading();
  }

  async signUpWithLoading() {
    this.logMe('Starting user signup process');
    this.showInfo.update(() => '');
    this.isLoading.update(() => true);
    this.errorService.clearErrors();

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let signUpCompleted = false;

    try {
      this.logMe('Setting up signup timeout (10 seconds)');
      timeoutId = setTimeout(() => {
        if (!signUpCompleted) {
          this.warnMe('Signup process timed out');
          this.setTimeoutMessage();
          this.isLoading.update(() => false);
        }
      }, 10000);

      this.logMe(
        'Calling Supabase service to sign up new user',
        this.emailControl.value,
      );
      await this.spbsService.signUpNewUser(
        this.emailControl.value,
        this.pwdControl.value,
      );
      signUpCompleted = true;
      this.showInfo.set('Wurde erfolgreich versendet.');
      this.logMe('User signup successful');
    } catch (error) {
      signUpCompleted = true;
      this.errorMe('User signup failed', error);
    } finally {
      if (timeoutId) {
        clearTimeout(timeoutId);
        this.logMe('Cleared signup timeout');
      }

      if (this.isLoading()) {
        this.isLoading.update(() => false);
        this.logMe('Loading indicator set to false');
      }
    }
  }

  setTimeoutMessage() {
    this.errorMe('Timeout message triggered for signup process');
    this.errorService.addError({
      type: ErrorType.error,
      userMessage: this.translationService.errorTimeout()(),
      additionalMessage: 'Signup process took too long.',
    });
  }

  isEMailFocused(isFocused: boolean) {
    this.selectedEmailField = isFocused;
    this.logMe(`Email field focus changed to: ${isFocused}`);
  }

  isPasswordFocused(isFocused: boolean) {
    this.selectedPasswordField = isFocused;
    this.logMe(`Password field focus changed to: ${isFocused}`);
  }

  get emailControl(): FormControl {
    return this.registrationForm.get('email') as FormControl;
  }

  get pwdControl(): FormControl {
    return this.registrationForm.get('password') as FormControl;
  }

  logMe(message: string, params?: unknown) {
    this.loggerService.log({
      scope: this.COMPONENTNAME,
      message: message,
      params: params,
    });
  }

  warnMe(message: string, params?: unknown) {
    this.loggerService.warn({
      scope: this.COMPONENTNAME,
      message: message,
      params: params,
    });
  }

  errorMe(message: string, params?: unknown) {
    this.loggerService.error({
      scope: this.COMPONENTNAME,
      message: message,
      params: params,
    });
  }
}
