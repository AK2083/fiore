import { NgClass } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { IFlag } from '../iflag/IFlag';

@Component({
  selector: 'app-en-flag',
  imports: [NgClass],
  templateUrl: './en-flag.component.html',
  styles: ``,
  exportAs: 'flagAnimation'
})
export class EnFlagComponent implements IFlag {
  @HostBinding('class.hovered') isHovered = false;

  setHovered(value: boolean) {
    this.isHovered = value;
  }
}
