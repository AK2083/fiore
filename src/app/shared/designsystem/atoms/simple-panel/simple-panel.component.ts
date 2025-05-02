import { Component, Input } from '@angular/core';
import { PaddingDirective } from '../../directives/padding.directive';

@Component({
  selector: 'app-simple-panel',
  imports: [PaddingDirective],
  templateUrl: './simple-panel.component.html',
  styles: ``
})
export class SimplePanelComponent {
  @Input() paddingSize: 'small' | 'medium' | 'large' = 'medium';
}
