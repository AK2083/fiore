// src/app/features/auth/services/registration-form/registration-form.service.ts

import { Injectable, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordUtils } from '@features/auth/utils/password.utils';
import { SupabaseService } from '@features/auth/services/supabase/supabase.service';
import { ErrorService } from '@core/services/error/error.service';
import { TranslationService } from '@features/auth/services/localize/translation.service';
import {
  ScopedLogger,
  scopedLoggerFactory,
} from '@core/utils/logging/scope.logger.factory';
import { signal } from '@angular/core';
import { ErrorType } from '@core/models/messages/error.message.model';

@Injectable({
  providedIn: 'root',
})
export class RegistrationFormService {
  private spbsService = inject(SupabaseService);
  private errorService = inject(ErrorService);
  private translationService = inject(TranslationService);
  private loggerService: ScopedLogger = scopedLoggerFactory(
    RegistrationFormService,
  );

  public registrationForm: FormGroup;
  public passwordUtils: PasswordUtils;

  public isLoading = signal(false);
  public showInfo = signal('');

  constructor() {
    this.registrationForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

    this.passwordUtils = new PasswordUtils(this.pwdControl);
  }

  get emailControl(): FormControl<string> {
    return this.registrationForm.get('email') as FormControl<string>;
  }

  get pwdControl(): FormControl<string> {
    return this.registrationForm.get('password') as FormControl<string>;
  }

  public async registerUser(): Promise<void> {
    this.loggerService.log('Starting user signup process from service');
    this.showInfo.update(() => '');
    this.isLoading.update(() => true);
    this.errorService.clearErrors();

    if (!this.registrationForm.valid || !this.passwordUtils.allRulesValid()) {
      this.loggerService.log('Form or password rules are invalid in service');
      this.isLoading.update(() => false);
      this.errorService.addError({
        type: ErrorType.error,
        userMessage: this.translationService.passwordWrong()(), // Beispiel
        additionalMessage: 'Formular- oder Passwortregeln ungültig.',
      });
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let signUpCompleted = false;
    const timeoutInSeconds = 10;

    try {
      timeoutId = setTimeout(() => {
        if (!signUpCompleted) {
          this.loggerService.warn('Signup process timed out in service');
          this.setTimeoutMessage();
          this.isLoading.update(() => false);
        }
      }, timeoutInSeconds * 1000);

      await this.spbsService.signUpNewUser(
        this.emailControl.value,
        this.pwdControl.value,
      );
      signUpCompleted = true;
      this.showInfo.set('Wurde erfolgreich versendet.');
      this.loggerService.log('User signup successful from service');
    } catch (error) {
      signUpCompleted = true;
      this.loggerService.error('User signup failed in service', error);
    } finally {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (this.isLoading()) {
        this.isLoading.update(() => false);
      }
    }
  }

  private setTimeoutMessage() {
    this.errorService.addError({
      type: ErrorType.error,
      userMessage: this.translationService.errorTimeout()(),
      additionalMessage: 'Signup process took too long.',
    });
  }
}
