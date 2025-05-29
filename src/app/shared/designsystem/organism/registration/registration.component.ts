import { Component } from '@angular/core';
import { HeaderComponent } from '../../molecules/header/header.component';
import { SimplePanelComponent } from '../../atoms/simple-panel/simple-panel.component';
import { LabeledInputComponent } from '../../molecules/labeled-input/labeled-input.component';
import { TranslatePipe } from '@ngx-translate/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { SupabaseService } from '../../../services/supabase.service';
import { CommonError, ErrorService } from '../../../services/error.service';
import { AlertComponent } from '../../molecules/alert/alert.component';
import { SubtitleComponent } from '../../atoms/subtitle/subtitle.component';
import { TitleComponent } from '../../atoms/title/title.component';
import { RegisterComponent } from '../../atoms/icons/register.component';
import { LettercaseComponent } from '../../atoms/icons/lettercase.component';
import { LockComponent } from '../../atoms/icons/lock.component';
import { EyeOpenComponent } from '../../atoms/icons/eye-open.component';
import { EyeCloseComponent } from '../../atoms/icons/eye-close.component';
import { CircleComponent } from '../../atoms/icons/circle.component';


@Component({
  selector: 'app-registration',
  imports: [
    NgIf,
    NgClass,
    ReactiveFormsModule,
    TranslatePipe,
    HeaderComponent,
    SimplePanelComponent,
    LabeledInputComponent,
    AlertComponent,
    TitleComponent,
    SubtitleComponent,
    RegisterComponent,
    LettercaseComponent,
    LockComponent,
    EyeOpenComponent,
    EyeCloseComponent,
    CircleComponent
],
  templateUrl: './registration.component.html',
  styles: ``,
})
export class RegistrationComponent {
  isPasswordVisible = false;
  selectedEmailField = false;
  selectedPasswordField = false;
  isLoading = false;

  registrationForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  MINPWDLENGTH = 8;
  allRulesValid = false;
  errors: CommonError | null = null;

  rules = {
    minLength: false,
    hasUpperCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  };

  constructor(private error: ErrorService,private spbsService: SupabaseService) {
    this.pwdControl.valueChanges.subscribe((value) => {
      this.rules.minLength = value?.length >= this.MINPWDLENGTH;
      this.rules.hasUpperCase = /[A-Z]/.test(value);
      this.rules.hasNumber = /\d/.test(value);
      this.rules.hasSpecialChar = /[\^°"@!%*?&§/()=?`´+*~'#,.-;:_<>|]/.test(
        value,
      );

      this.allRulesValid = Object.values(this.rules).every(Boolean);
    });
  }

  onSubmit() {
    this.isLoading = true;
    if (!this.registrationForm.valid) {
      console.log('Formular ist ungültig!');
    }

    const mail = this.emailControl.value;
    const pwd = this.pwdControl.value;

    this.spbsService.signUpNewUser(mail, pwd);
    
    this.isLoading = false;
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
