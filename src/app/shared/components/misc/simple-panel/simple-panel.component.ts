import { NgClass, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-simple-panel',
  imports: [NgIf, NgClass, NgTemplateOutlet],
  templateUrl: './simple-panel.component.html',
  styles: ``
})
export class SimplePanelComponent {
  @Input() styleClass = "";
  @Input() contentTemplate?: TemplateRef<any>;
}
