import { NgClass } from '@angular/common';
import { Component, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';

export type LanguageModel = {
  langName: string;
  ariaLabel: string,
  lang: string;
  welcomeText: string;
  isActive: boolean;
}

@Component({
  selector: 'app-lang-button',
  imports: [NgClass],
  templateUrl: './lang-button.component.html',
  styles: ``
})
export class LangButtonComponent {
  @Output() changeLanguage = new EventEmitter<LanguageModel>();
  @Input() language: LanguageModel = {
    langName: '',
    ariaLabel: '',
    lang: '',
    welcomeText: '',
    isActive: false
  };

  changeLang() {
    this.changeLanguage.emit({
      ...this.language,
      isActive: true
    });
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.changeLang();
    }
  }
}
