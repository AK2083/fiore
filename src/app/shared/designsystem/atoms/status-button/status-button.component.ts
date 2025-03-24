import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-status-button',
  imports: [NgClass],
  templateUrl: './status-button.component.html',
  styles: ``
})
export class StatusButtonComponent {
  @Input() type!: string;

  @Input() isActive = false;
  @Input() label = "";
  @Output() returnIdentifier = new EventEmitter<string>();

  emitEvent() {
    this.returnIdentifier.emit(this.type);
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.emitEvent();
    }
  }
}
