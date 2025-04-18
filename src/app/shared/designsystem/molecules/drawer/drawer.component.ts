import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-drawer',
  imports: [],
  templateUrl: './drawer.component.html',
})
export class DrawerComponent {
  @Output() pressButton = new EventEmitter<boolean>();

  onClick() {
    this.pressButton.emit(false);
  }
}
