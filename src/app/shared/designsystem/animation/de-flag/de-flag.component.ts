import { NgClass } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { IFlag } from '../iflag/IFlag';

@Component({
  selector: 'app-de-flag',
  imports: [NgClass],
  templateUrl: './de-flag.component.html',
  styles: ``,
  exportAs: 'flagAnimation'
})
export class DeFlagComponent implements IFlag {
  @HostBinding('class.hovered') isHovered = false;

  setHovered(value: boolean) {
    this.isHovered = value;
  }
}
