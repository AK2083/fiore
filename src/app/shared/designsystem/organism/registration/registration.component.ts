import { Component } from '@angular/core';
import { HeaderComponent } from '../../atoms/header/header.component';
import { SimplePanelComponent } from '../../atoms/simple-panel/simple-panel.component';
import { LabeledInputComponent } from '../../molecules/labeled-input/labeled-input.component';
import { LettercaseComponent } from '../../icons/lettercase/lettercase.component';
import { LockComponent } from '../../icons/lock/lock.component';
import { EyeCloseComponent } from '../../icons/eye-close/eye-close.component';
import { EyeOpenComponent } from '../../icons/eye-open/eye-open.component';
import { TranslatePipe } from '@ngx-translate/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { RegisterComponent } from '../../icons/register/register.component';
import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-registration',
  imports: [
    NgIf,
    ReactiveFormsModule,
    TranslatePipe,
    HeaderComponent,
    SimplePanelComponent,
    LabeledInputComponent,
    LettercaseComponent,
    LockComponent,
    EyeCloseComponent,
    EyeOpenComponent,
    RegisterComponent,
  ],
  templateUrl: './registration.component.html',
  styles: ``,
})
export class RegistrationComponent {
  isPasswordVisible = false;
  selectedEmailField = false;
  selectedPasswordField = false;

  registrationForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  allRulesValid = false;

  rules = {
    minLength: false,
    hasUpperCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  };

  constructor(private spbsService: SupabaseService) {
    this.pwdControl.valueChanges.subscribe((value) => {
      this.rules.minLength = value?.length >= 8;
      this.rules.hasUpperCase = /[A-Z]/.test(value);
      this.rules.hasNumber = /\d/.test(value);
      this.rules.hasSpecialChar = /[\^°"@!%*?&§\/()=?`´+*~'#,.-;:_<>|]/.test(
        value,
      );

      this.allRulesValid = Object.values(this.rules).every(Boolean);
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log('Formular ist gültig!', this.registrationForm.value);
    } else {
      console.log('Formular ist ungültig!');
    }

    const mail = this.emailControl.value;
    const pwd = this.pwdControl.value;

    this.spbsService.signUpNewUser(mail, pwd);
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
