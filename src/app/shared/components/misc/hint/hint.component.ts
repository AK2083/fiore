import { Component, Input } from '@angular/core';
import { CrossCircleComponent } from '../icons/cross-circle.component';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-hint',
  imports: [NgClass, NgIf, CrossCircleComponent],
  templateUrl: './hint.component.html',
  styleUrl: './hint.component.css',
})
export class HintComponent {
  @Input() message = "";
  @Input() severity: "danger" | "warning" | "info" = "info";
}
