import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-label',
  imports: [],
  templateUrl: './label.component.html',
  styles: ``,
})
export class LabelComponent {
  @Input() labelFor: string = '';
  @Input() content: string = '';
}
