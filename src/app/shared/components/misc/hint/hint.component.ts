import { Component, Input } from '@angular/core';
import { CrossCircleComponent } from '../icons/cross-circle.component';
import { NgClass, NgIf } from '@angular/common';
import { CheckCircleComponent } from '../icons/check-circle.component';

@Component({
  selector: 'app-hint',
  imports: [NgClass, NgIf, CrossCircleComponent, CheckCircleComponent],
  templateUrl: './hint.component.html',
  styleUrl: './hint.component.css',
})
export class HintComponent {
  @Input() message = "";
  @Input() severity: "danger" | "warning" | "info" = "info";
}
