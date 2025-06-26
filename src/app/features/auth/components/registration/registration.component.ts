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
import { registerTranslation } from '@features/auth/models/register.translation';

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
  } as registerTranslation;

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
    if (!this.registrationForm.valid) {
      console.log('Formular ist ungültig!');
      this.isLoading.update(() => false);
      return;
    }

    await this.signUpWithLoading();
  }

  async signUpWithLoading() {
    console.log('signup');
    this.showInfo.update(() => '');
    this.isLoading.update(() => true);
    this.errorService.clearErrors();

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let signUpCompleted = false;

    try {
      timeoutId = setTimeout(() => {
        if (!signUpCompleted) {
          this.setTimeoutMessage();
          this.isLoading.update(() => false);
        }
      }, 10000);

      await this.spbsService.signUpNewUser(
        this.emailControl.value,
        this.pwdControl.value,
      );
      signUpCompleted = true;
      this.showInfo.set('Wurde erfolgreich versendet.');
    } catch {
      signUpCompleted = true;
    } finally {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      if (this.isLoading()) {
        this.isLoading.update(() => false);
      }
    }
  }

  setTimeoutMessage() {
    this.errorService.addError({
      type: ErrorType.error,
      userMessage: this.translationService.errorTimeout()(),
      additionalMessage: '',
    });
  }

  isEMailFocused(isFocused: boolean) {
    this.selectedEmailField = isFocused;
  }

  isPasswordFocused(isFocused: boolean) {
    this.selectedPasswordField = isFocused;
  }

  get emailControl(): FormControl {
    return this.registrationForm.get('email') as FormControl;
  }

  get pwdControl(): FormControl {
    return this.registrationForm.get('password') as FormControl;
  }
}
