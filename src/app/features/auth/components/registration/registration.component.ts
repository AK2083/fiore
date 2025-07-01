import { Component, computed, inject } from '@angular/core';
import { HeaderComponent } from '@shared/components/misc/header/header.component';
import { SimplePanelComponent } from '@shared/components/misc/simple-panel/simple-panel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { ErrorService } from '@core/services/error/error.service';
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
import { ScopedLogger } from '@core/utils/logging/scope.logger';
import { scopedLoggerFactory } from '@core/utils/logging/scope.logger.factory';
import { PasswordUtils } from '@features/auth/utils/password.utils';
import { RegistrationFormService } from '@features/auth/services/registration/form.service';

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
  private translationService = inject(TranslationService);
  private loggerService = inject(ScopedLogger);
  public registrationFormService = inject(RegistrationFormService);

  pwdUtils: PasswordUtils = new PasswordUtils(this.pwdControl);

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
      this.pwdUtils.MINPASSWORDLENGTH,
    ),
    question: this.translationService.accountQuestion(),
    exclamation: this.translationService.signInExclamation(),
  } as RegisterTranslation;

  isPasswordVisible = false;
  isLoading = this.registrationFormService.isLoading;
  showInfo = this.registrationFormService.showInfo;
  selectedEmailField = false;
  selectedPasswordField = false;
  currentError = computed(() => this.errorService.getLatestError());

  get registrationForm() {
    return this.registrationFormService.registrationForm;
  }
  get emailControl() {
    return this.registrationFormService.emailControl;
  }
  get pwdControl() {
    return this.registrationFormService.pwdControl;
  }
  get passwordUtils() {
    return this.registrationFormService.passwordUtils;
  }

  isEMailFocused(isFocused: boolean) {
    this.selectedEmailField = isFocused;
    this.loggerService.log('Email field focus changed to:', isFocused);
  }

  isPasswordFocused(isFocused: boolean) {
    this.selectedPasswordField = isFocused;
    this.loggerService.log('Password field focus changed to:', isFocused);
  }
}
