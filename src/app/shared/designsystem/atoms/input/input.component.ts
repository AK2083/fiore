import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styles: ``,
})
export class InputComponent {
  @Input({ required: true }) control!: FormControl<string>;

  @Input() placeholder = '';
  @Input() type = '';
  @Input() name = '';
  @Input() id = '';

  @Output() handleFocused = new EventEmitter<boolean>();

  handleInputEvent(isFocused: boolean) {
    this.handleFocused.emit(isFocused);
  }
}
