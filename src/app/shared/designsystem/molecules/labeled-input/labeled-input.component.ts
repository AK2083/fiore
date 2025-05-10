import { NgIf } from '@angular/common';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LabelComponent } from '../../atoms/label/label.component';
import { InputComponent } from '../../atoms/input/input.component';

@Component({
  selector: 'app-labeled-input',
  imports: [NgIf, ReactiveFormsModule, LabelComponent, InputComponent],
  templateUrl: './labeled-input.component.html',
  styles: ``,
})
export class LabeledInputComponent {
  @ContentChild('prefix', { read: TemplateRef })
  prefixContent!: TemplateRef<any>;
  @ContentChild('suffix', { read: TemplateRef })
  suffixContent!: TemplateRef<any>;

  @Input() label = '';
  @Input() placeholder = '';
  @Input() type = '';
  @Input() name = '';
  @Input() id = '';
  @Input({ required: true }) control!: FormControl<string>;

  @Input() requiredError = '';
  @Input() invalidError = '';

  @Output() handleFocused = new EventEmitter<boolean>();

  isFocused(isFocused: boolean) {
    this.handleFocused.emit(isFocused);
  }
}
