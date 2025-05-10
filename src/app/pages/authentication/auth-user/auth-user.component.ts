import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/designsystem/atoms/header/header.component';
import { SimplePanelComponent } from '../../../shared/designsystem/atoms/simple-panel/simple-panel.component';
import { NgClass, NgIf } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../../shared/designsystem/atoms/input/input.component';
import { LettercaseComponent } from '../../../shared/designsystem/icons/lettercase/lettercase.component';
import { LockComponent } from '../../../shared/designsystem/icons/lock/lock.component';
import { EyeOpenComponent } from '../../../shared/designsystem/icons/eye-open/eye-open.component';
import { EyeCloseComponent } from '../../../shared/designsystem/icons/eye-close/eye-close.component';
import { LabelComponent } from '../../../shared/designsystem/atoms/label/label.component';
import { LabeledInputComponent } from '../../../shared/designsystem/molecules/labeled-input/labeled-input.component';

@Component({
  selector: 'app-auth-user',
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgClass,
    TranslatePipe,
    HeaderComponent,
    SimplePanelComponent,
    InputComponent,
    LettercaseComponent,
    EyeOpenComponent,
    EyeCloseComponent,
    LockComponent,
    LabelComponent,
    LabeledInputComponent,
  ],
  templateUrl: './auth-user.component.html',
  styles: ``,
})
export class AuthUserComponent {
  isPasswordVisible = false;
  selectedEmailField = false;
  selectedPasswordField = false;

  myForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    if (this.myForm.valid) {
      console.log('Formular ist gültig!', this.myForm.value);
    } else {
      console.log('Formular ist ungültig!');
    }
  }

  isEMailFocused(isFocused: boolean) {
    this.selectedEmailField = isFocused;
  }

  isPasswordFocused(isFocused: boolean) {
    this.selectedPasswordField = isFocused;
  }

  get emailControl(): FormControl {
    return this.myForm.get('email') as FormControl;
  }

  get pwdControl(): FormControl {
    return this.myForm.get('password') as FormControl;
  }
}
