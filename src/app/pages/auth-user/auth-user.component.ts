import { Component, signal } from '@angular/core';
import { HeaderComponent } from '../../shared/designsystem/atoms/header/header.component';
import { SimplePanelComponent } from '../../shared/designsystem/atoms/simple-panel/simple-panel.component';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-auth-user',
  imports: [NgIf, NgClass, HeaderComponent, SimplePanelComponent],
  templateUrl: './auth-user.component.html',
  styles: ``
})
export class AuthUserComponent {
  isPasswordVisible = false;
  selectedEmailField = false;
  selectedPasswordField = false;
}
