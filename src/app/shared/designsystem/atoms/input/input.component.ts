import { NgClass, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [NgIf, NgClass, NgTemplateOutlet, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {
  @Input() prefixTemplate!: TemplateRef<any>;
  @Input() suffixTemplate!: TemplateRef<any>;

  @Input({ required: true }) control!: FormControl<string>;

  @Input() placeholder = '';
  @Input() type = '';
  @Input() name = '';
  @Input() id = '';

  @Output() handleFocused = new EventEmitter<boolean>();

  isFocused = false;

  handleInputEvent(isFocused: boolean) {
    this.isFocused = isFocused;
    this.handleFocused.emit(isFocused);
  }
}
