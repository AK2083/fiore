import { Component } from '@angular/core';
import { CrossCircleComponent } from '../../atoms/icons/cross-circle.component';

@Component({
  selector: 'app-alert',
  imports: [CrossCircleComponent],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent {}
