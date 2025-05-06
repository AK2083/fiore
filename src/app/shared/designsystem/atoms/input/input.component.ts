import { NgIf, NgTemplateOutlet } from '@angular/common';
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
  imports: [NgIf, NgTemplateOutlet, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @ContentChild('prefix', { read: TemplateRef })
  prefixContent!: TemplateRef<any>;
  @ContentChild('suffix', { read: TemplateRef })
  suffixContent!: TemplateRef<any>;

  @Input({ required: true }) control!: FormControl<string>;

  @Input() placeholder = '';
  @Input() type = '';
  @Input() name = '';
  @Input() id = '';

  @Output() handleFocused = new EventEmitter<boolean>();

  hasProjectedContent = false;
  hasSuffixContent = false;

  handleInputEvent(isFocused: boolean) {
    this.handleFocused.emit(isFocused);
  }

  ngAfterContentInit() {
    this.hasProjectedContent = !!this.prefixContent;
    this.hasSuffixContent = !!this.suffixContent;
  }
}
