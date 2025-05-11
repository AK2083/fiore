import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TextSizeDirective } from '../../directives/text-size.directive';

@Component({
  selector: 'app-header',
  imports: [NgIf, TextSizeDirective],
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {
  @Input() textSize: 'small' | 'medium' | 'large' = 'medium';
  @Input() title: string | null = null;
  @Input() subtitle: string | null = null;
  @Input() isLoading = true;
}
