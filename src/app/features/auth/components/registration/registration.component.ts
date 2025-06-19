import { Component, computed, signal } from '@angular/core';
import { HeaderComponent } from '@shared/components/misc/header/header.component';
import { SimplePanelComponent } from '@shared/components/misc/simple-panel/simple-panel.component';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
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
import { TranslationService } from '@features/translation/services/translation/translation.service';

@Component({
  selector: 'app-registration',
  imports: [
    NgIf,
    NgClass,
    ReactiveFormsModule,
    TranslatePipe,
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
  styles: ``,
})
export class RegistrationComponent {
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

  MINPWDLENGTH = 8;
  allRulesValid = false;
  currentError = computed(() => this.errorService.getLatestError());

  rules = {
    minLength: false,
    hasUpperCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  };

  constructor(
    private errorService: ErrorService,
    private spbsService: SupabaseService,
    private translate: TranslationService,
  ) {
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
    console.log("signup");
    this.showInfo.update(() => "");
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
        this.pwdControl.value
      );
      signUpCompleted = true; 
      this.showInfo.set('Wurde erfolgreich versendet.');
  
    } catch (error: any) {
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

  setFailedMessage(error: any) {
    this.translate.getFailed().subscribe((translatedMessage: string) => {
      this.errorService.addError({
        type: ErrorType.error,
        userMessage: translatedMessage,
        additionalMessage: error.message,
      });
    });
  }

  setTimeoutMessage() {
    this.translate.getTimeout().subscribe((translatedMessage: string) => {
      this.errorService.addError({
        type: ErrorType.error,
        userMessage: translatedMessage,
        additionalMessage: '',
      });
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
