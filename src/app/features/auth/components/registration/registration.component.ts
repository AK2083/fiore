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
import { ScopedLogger } from '@core/helper/logging/scope.logger';
import { scopedLoggerFactory } from '@core/helper/logging/scope.logger.factory';

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
  providers: [
    {
      provide: ScopedLogger,
      useFactory: () => scopedLoggerFactory(RegistrationComponent),
    },
  ],
})
export class RegistrationComponent {
  private errorService = inject(ErrorService);
  private spbsService = inject(SupabaseService);
  private translationService = inject(TranslationService);
  private loggerService = inject(ScopedLogger);

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

  constructor() {
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
    this.loggerService.log('Submit button clicked');

    if (!this.registrationForm.valid) {
      this.loggerService.log('Form is invalid', this.registrationForm.errors);
      this.isLoading.update(() => false);
      return;
    }

    this.loggerService.log('Proceeding with signup');
    await this.signUpWithLoading();
  }

  async signUpWithLoading() {
    this.loggerService.log('Starting user signup process');
    this.showInfo.update(() => '');
    this.isLoading.update(() => true);
    this.errorService.clearErrors();

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let signUpCompleted = false;
    const timeoutInSeconds = 10;

    try {
      this.loggerService.log(
        'Setting up signup timeout: ',
        `${timeoutInSeconds} seconds`,
      );
      timeoutId = setTimeout(() => {
        if (!signUpCompleted) {
          this.loggerService.warn('Signup process timed out');
          this.setTimeoutMessage();
          this.isLoading.update(() => false);
        }
      }, timeoutInSeconds * 1000);

      this.loggerService.log(
        'Calling Supabase service to sign up new user',
        this.emailControl.value,
      );
      await this.spbsService.signUpNewUser(
        this.emailControl.value,
        this.pwdControl.value,
      );
      signUpCompleted = true;
      this.showInfo.set('Wurde erfolgreich versendet.');
      this.loggerService.log('User signup successful');
    } catch (error) {
      signUpCompleted = true;
      this.loggerService.error('User signup failed', error);
    } finally {
      if (timeoutId) {
        clearTimeout(timeoutId);
        this.loggerService.log('Cleared signup timeout');
      }

      if (this.isLoading()) {
        this.isLoading.update(() => false);
        this.loggerService.log('Loading indicator set to false');
      }
    }
  }

  setTimeoutMessage() {
    this.loggerService.error('Timeout message triggered for signup process');
    this.errorService.addError({
      type: ErrorType.error,
      userMessage: this.translationService.errorTimeout()(),
      additionalMessage: 'Signup process took too long.',
    });
  }

  isEMailFocused(isFocused: boolean) {
    this.selectedEmailField = isFocused;
    this.loggerService.log('Email field focus changed to:', isFocused);
  }

  isPasswordFocused(isFocused: boolean) {
    this.selectedPasswordField = isFocused;
    this.loggerService.log('Password field focus changed to:', isFocused);
  }

  get emailControl(): FormControl {
    return this.registrationForm.get('email') as FormControl;
  }

  get pwdControl(): FormControl {
    return this.registrationForm.get('password') as FormControl;
  }
}
