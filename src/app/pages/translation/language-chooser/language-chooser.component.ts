import { Component, OnInit } from '@angular/core';
import { SimplePanelComponent } from '../../../shared/designsystem/atoms/simple-panel/simple-panel.component';
import { HeaderComponent } from '../../../shared/designsystem/atoms/header/header.component';
import { GlobeComponent } from '../../../shared/designsystem/icons/globe/globe.component';
import { StatusButtonComponent } from '../../../shared/designsystem/atoms/status-button/status-button.component';
import { AsyncPipe, NgFor } from '@angular/common';
import {
  LanguageNames,
  TranslationService,
} from '../../../shared/services/translation.service';
import { Observable, of } from 'rxjs';
import { TextWithSubtextComponent } from '../../../shared/designsystem/molecules/text-with-subtext/text-with-subtext.component';

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
    AsyncPipe,
    NgFor,
    SimplePanelComponent,
    HeaderComponent,
    GlobeComponent,
    StatusButtonComponent,
    TextWithSubtextComponent,
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
