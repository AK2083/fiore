import { Component, HostBinding } from '@angular/core';
import { IFlag } from '../iflag/IFlag';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-es-flag',
  imports: [NgClass],
  templateUrl: './es-flag.component.html',
  styles: ``,
  exportAs: 'flagAnimation'
})
export class EsFlagComponent implements IFlag {
  @HostBinding('class.hovered') isHovered = false;

  setHovered(value: boolean) {
    this.isHovered = value;
  }
}
