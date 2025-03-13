import { Component, ContentChild, ContentChildren, QueryList } from '@angular/core';
import { IFlag } from '../../animation/iflag/IFlag';

@Component({
  selector: 'app-lang-button',
  imports: [],
  templateUrl: './lang-button.component.html',
  styles: ``
})
export class LangButtonComponent {
  @ContentChildren('flagAnimation') flagAnimations!: QueryList<IFlag>;

  onMouseEnter() {
    this.flagAnimations.forEach(flag => flag.setHovered(true));
  }

  onMouseLeave() {
    this.flagAnimations.forEach(flag => flag.setHovered(false));
  }
}
