import { NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [NgIf, NgTemplateOutlet],
  templateUrl: './header.component.html',
  styles: '',
})
export class HeaderComponent {
  @Input() iconTemplate?: TemplateRef<unknown>;
  @Input({ required: true }) titleTemplate: TemplateRef<unknown> | undefined;
  @Input() subtitleTemplate?: TemplateRef<unknown>;
}
