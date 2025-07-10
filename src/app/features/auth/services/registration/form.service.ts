// src/app/features/auth/services/registration-form/registration-form.service.ts

import { Injectable, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordUtils } from '@features/auth/utils/password.utils';
import { SupabaseService } from '@features/auth/services/supabase/supabase.service';
import { TranslationService } from '@features/auth/services/localize/translation.service';
import {
  ScopedLogger,
  scopedLoggerFactory,
} from '@core/utils/logging/scope.logger.factory';
import { signal } from '@angular/core';
import {
  DisplayType,
  UserMessage,
} from '@core/models/messages/user.message.model';
import { WrongPasswordException } from '@features/auth/models/error/wrongPasswordException';
import { TimeoutException } from '@features/auth/models/error/timeoutException';

@Injectable({
  providedIn: 'root',
})
export class RegistrationFormService {
  private spbsService = inject(SupabaseService);
  private translationService = inject(TranslationService);
  private loggerService: ScopedLogger = scopedLoggerFactory(
    RegistrationFormService,
  );

  public registrationForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  public passwordUtils = new PasswordUtils(this.pwdControl);
  public errorUserMessage = signal<UserMessage | null>(null);

  get emailControl(): FormControl<string> {
    return this.registrationForm.get('email') as FormControl<string>;
  }

  get pwdControl(): FormControl<string> {
    return this.registrationForm.get('password') as FormControl<string>;
  }

  public async registerUser(): Promise<UserMessage> {
    this.loggerService.log('Starting user signup process from service');

    if (!this.registrationForm.valid || !this.passwordUtils.allRulesValid()) {
      this.loggerService.error('Form or password rules are invalid in service');

      throw new WrongPasswordException({
        title: 'Wrong password',
        message: this.translationService.passwordWrong()(),
        code: this.passwordUtils.getErrorCode() || 'PASSWORD_VALIDATION_FAILED',
        field: 'password',
        displayType: DisplayType.Inline,
        severity: 'danger',
      });
    }

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let signUpCompleted = false;
    const timeoutInSeconds = 10;

    try {
      timeoutId = setTimeout(() => {
        if (!signUpCompleted) {
          this.loggerService.warn('Signup process timed out in service');
          throw new TimeoutException({
            title: 'Signup process took too long.',
            message: this.translationService.errorTimeout()(),
            code: 'SUBMIT_TIMEOUT',
            field: '',
            displayType: DisplayType.Inline,
            severity: 'danger',
          });
        }
      }, timeoutInSeconds * 1000);

      await this.spbsService.signUpNewUser(
        this.emailControl.value,
        this.pwdControl.value,
      );
      signUpCompleted = true;
      this.loggerService.log('User signup successful from service');

      return {
        title: 'Registrierung erfolgreich',
        message: this.translationService.successReport()(),
        code: 'REGISTRATION_SUCCESS',
        field: '',
        displayType: DisplayType.Inline,
        severity: 'info',
      };
    } catch (error) {
      signUpCompleted = true;
      this.loggerService.error('User signup failed in service', error);
    } finally {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }

    return {
      title: 'Unbekannter Zustand',
      message: 'Bitte versuchen Sie es erneut.',
      code: 'UNKNOWN_STATE',
      displayType: DisplayType.Inline,
      severity: 'warning',
    };
  }
}
