import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../../shared/services/translation.service';
import { LanguageModel } from '../../shared/designsystem/atoms/lang-button/lang-button.component';
import { NgFor } from '@angular/common';
import { StatusButtonComponent } from '../../shared/designsystem/atoms/status-button/status-button.component';

enum Language {
  DE = 'de',
  EN = 'en',
  ES = 'es'
}

@Component({
  selector: 'app-language-overview',
  imports: [NgFor, StatusButtonComponent],
  templateUrl: './language-overview.component.html',
  styles: ``
})
export class LanguageOverviewComponent implements OnInit {
  langItems: LanguageModel[] = [];
  language = Language;
  
  constructor(public translate: TranslationService) { }

  ngOnInit() {
    this.loadLanguageItems();
  }

  changeLanguageEvent(langType: string) {
    this.translate.setSelectedLanguage(langType);
    this.loadLanguageItems(langType);
  }

  loadLanguageItems(lng: string = "") {
    if (lng === "") 
      lng = this.translate.getDefaultLanguage();

    this.translate.getLanguageNames().subscribe(({ de, en, es }) => {
      this.langItems = [
        {
          langName: de.langName,
          ariaLabel: de.ariaLabel,
          lang: this.language.DE,
          welcomeText: 'Guten Morgen',
          isActive: lng === this.language.DE
        },
        {
          langName: en.langName,
          ariaLabel: en.ariaLabel,
          lang: this.language.EN,
          welcomeText: 'Good Morning',
          isActive: lng === this.language.EN
        },
        {
          langName: es.langName,
          ariaLabel: es.ariaLabel,
          lang: this.language.ES,
          welcomeText: 'Buenos Dias!',
          isActive: lng === this.language.ES
        }
      ];
    });
  }
}
