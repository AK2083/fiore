import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/designsystem/atoms/header/header.component';
import { SimplePanelComponent } from '../../../shared/designsystem/atoms/simple-panel/simple-panel.component';
import { NgClass, NgIf } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-user',
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgClass,
    TranslatePipe,
    HeaderComponent,
    SimplePanelComponent,
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
    password: new FormControl('', [Validators.required])
  });

  onSubmit() {
    if (this.myForm.valid) {
      console.log('Formular ist gültig!', this.myForm.value);
      // Hier kannst du die Formulardaten verarbeiten (z.B. an einen Service senden)
    } else {
      console.log('Formular ist ungültig!');
      // Hier kannst du Fehlermeldungen anzeigen oder dem Benutzer Feedback geben
    }
  }
}
