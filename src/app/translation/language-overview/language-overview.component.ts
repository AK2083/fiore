import { Component, OnInit } from '@angular/core';
import { LanguageNames, TranslationService } from '../../shared/services/translation.service';
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
    var lang = this.translate.getCurrentLanguage() || this.translate.getDefaultLanguage();
    this.loadLanguageItems(lang);
  }

  changeLanguageEvent(langType: string) {
    this.translate.setSelectedLanguage(langType);
    this.loadLanguageItems(langType);
  }

  loadLanguageItems(lng: string) {
    this.translate.getLanguageNames().subscribe({
      next: (names: LanguageNames) => {
        this.langItems = [
          {
            langName: names.de.langName,
            ariaLabel: names.de.ariaLabel,
            lang: this.language.DE,
            welcomeText: 'Guten Morgen',
            isActive: lng === this.language.DE
          },
          {
            langName: names.en.langName,
            ariaLabel: names.en.ariaLabel,
            lang: this.language.EN,
            welcomeText: 'Good Morning',
            isActive: lng === this.language.EN
          },
          {
            langName: names.es.langName,
            ariaLabel: names.es.ariaLabel,
            lang: this.language.ES,
            welcomeText: 'Buenos Dias',
            isActive: lng === this.language.ES
          }
        ];
      },
      error: (error) => {
        console.error('Error loading language names:', error);
      }
    });
  }
}
