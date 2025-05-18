import { Component, EventEmitter, Output } from '@angular/core';
import { IconComponent } from '../../atoms/icon/icon.component';

@Component({
  selector: 'app-drawer',
  imports: [IconComponent],
  templateUrl: './drawer.component.html',
})
export class DrawerComponent {
  @Output() pressButton = new EventEmitter<boolean>();

  onClick() {
    this.pressButton.emit(false);
  }
}
