import { NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  imports: [NgTemplateOutlet, NgIf],
  templateUrl: './icon-button.component.html',
  styles: ``
})
export class IconButtonComponent {
  @Input() iconTemplate?: TemplateRef<any>;

  @Input() srText: string | null = null;
  @Output() pressButton = new EventEmitter<boolean>();

  get safeSRText(): string {
    return this.srText ?? 'Allgemeiner Titel';
  }

  emitEvent(isPressed: boolean) {
    this.pressButton.emit(isPressed);
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.pressButton.emit(true);
    }
  }
}
