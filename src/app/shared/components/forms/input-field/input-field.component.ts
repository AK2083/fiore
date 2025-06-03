import { NgClass, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AutofocusDirective } from '@core/directives/autofocus/autofocus.directive';

@Component({
  selector: 'app-input-field',
  imports: [
    NgIf,
    NgClass,
    ReactiveFormsModule,
    AutofocusDirective,
    NgTemplateOutlet,
  ],
  templateUrl: './input-field.component.html',
  styles: ``,
})
export class InputFieldComponent {
  @Input() prefixIconTemplate?: TemplateRef<unknown>;
  @Input() suffixIconTemplate?: TemplateRef<unknown>;

  @Input() focus = false;
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type = '';
  @Input() name = '';
  @Input() id = '';
  @Input({ required: true }) control!: FormControl<string>;

  @Input() requiredError = '';
  @Input() invalidError = '';

  @Output() handleFocused = new EventEmitter<boolean>();

  handleInputEvent(isFocused: boolean) {
    this.focus = isFocused;
    this.handleFocused.emit(isFocused);
  }
}
