import { Component, EventEmitter, Output } from '@angular/core';
import { CrossComponent } from '../../atoms/icons/cross.component';

@Component({
  selector: 'app-drawer',
  imports: [CrossComponent],
  templateUrl: './drawer.component.html',
})
export class DrawerComponent {
  @Output() pressButton = new EventEmitter<boolean>();

  onClick() {
    this.pressButton.emit(false);
  }
}
