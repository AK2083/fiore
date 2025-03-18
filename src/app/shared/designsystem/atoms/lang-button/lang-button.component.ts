import { Component, OnInit, ContentChildren, Input, QueryList } from '@angular/core';
import { IFlag } from '../../animation/iflag/IFlag';
import { TranslateService, TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: 'app-lang-button',
  imports: [TranslatePipe],
  templateUrl: './lang-button.component.html',
  styles: ``
})
export class LangButtonComponent {
  @ContentChildren('flagAnimation') flagAnimations!: QueryList<IFlag>;
  @Input() langName = "";
  @Input() lang = "";

  constructor(public translate: TranslateService) { }

  onMouseEnter() {
    this.flagAnimations.forEach(flag => flag.setHovered(true));
  }

  onMouseLeave() {
    this.flagAnimations.forEach(flag => flag.setHovered(false));
  }

  changeLang() {
    this.translate.use(this.lang);
  }
}
