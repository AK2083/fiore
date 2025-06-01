import { Component, OnInit } from '@angular/core';
import { SimplePanelComponent } from '@shared/components/misc/simple-panel/simple-panel.component';
import { StatusButtonComponent } from '@shared/components/buttons/status-button/status-button.component';
import { NgFor, UpperCasePipe } from '@angular/common';
import {
  LanguageNames,
  TranslationService,
} from '@features/translation/services/translation/translation.service';
import { Observable, of } from 'rxjs';
import { GlobeComponent } from '@shared/components/misc/icons/globe.component';
import { HeaderComponent } from '@shared/components/misc/header/header.component';
import { TranslatePipe } from '@ngx-translate/core';

export interface LanguageModel {
  langName: string;
  ariaLabel: string;
  lang: string;
  welcomeText: string;
  isActive: boolean;
}

enum Language {
  DE = 'de',
  EN = 'en',
  ES = 'es',
}

@Component({
  selector: 'app-language-chooser',
  imports: [
    NgFor,
    SimplePanelComponent,
    TranslatePipe,
    HeaderComponent,
    GlobeComponent,
    StatusButtonComponent,
    UpperCasePipe
  ],
  templateUrl: './language-chooser.component.html',
  styles: ``,
})
export class LanguageChooserComponent implements OnInit {
  langItems: LanguageModel[] = [];
  language = Language;
  isLoading = true;
  menuTitle$: Observable<string> = of();
  iconSRSupport$: Observable<string> = of();

  constructor(public translate: TranslationService) {}

  ngOnInit() {
    this.menuTitle$ = this.translate.getTranslationTitle();
    this.iconSRSupport$ = this.translate.getIconSRSupport();

    const lang =
      this.translate.getCurrentLanguage() ||
      this.translate.getDefaultLanguage();
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
            welcomeText: names.de.welcomeText,
            isActive: lng === this.language.DE,
          },
          {
            langName: names.en.langName,
            ariaLabel: names.en.ariaLabel,
            lang: this.language.EN,
            welcomeText: names.en.welcomeText,
            isActive: lng === this.language.EN,
          },
          {
            langName: names.es.langName,
            ariaLabel: names.es.ariaLabel,
            lang: this.language.ES,
            welcomeText: names.es.welcomeText,
            isActive: lng === this.language.ES,
          },
        ];

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading language names:', error);
      },
    });
  }
}
