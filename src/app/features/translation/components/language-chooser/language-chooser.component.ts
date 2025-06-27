import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { SimplePanelComponent } from '@shared/components/misc/simple-panel/simple-panel.component';
import { StatusButtonComponent } from '@shared/components/buttons/status-button/status-button.component';
import { NgFor, UpperCasePipe } from '@angular/common';
import { GlobeComponent } from '@shared/components/misc/icons/globe.component';
import { HeaderComponent } from '@shared/components/misc/header/header.component';
import { TranslationService } from '@features/translation/services/localize/translation.service';
import { Translations } from '@features/translation/models/language.chooser.translation';

export interface LanguageModel {
  langName: Signal<string>;
  ariaLabel: Signal<string>;
  lang: string;
  welcomeText: Signal<string>;
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
    HeaderComponent,
    GlobeComponent,
    StatusButtonComponent,
    UpperCasePipe,
  ],
  templateUrl: './language-chooser.component.html',
  styles: ``,
})
export class LanguageChooserComponent implements OnInit {
  private translate = inject(TranslationService);

  langItems = signal<LanguageModel[]>([]);
  language = Language;
  isLoading = true;

  translations = {
    title: this.translate.title(),
    nameGerman: this.translate.nameGerman(),
    nameEnglish: this.translate.nameEnglish(),
    nameSpanish: this.translate.nameSpanish(),
    ariaTranslationLabel: this.translate.ariaTranslationLabel(),
    welcomeTextGerman: this.translate.welcomeTextGerman(),
    welcomeTextEnglish: this.translate.welcomeTextEnglish(),
    welcomeTextSpanish: this.translate.welcomeTextSpanish(),
  } as Translations

  ngOnInit() {
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
    this.langItems.set([
      {
        langName: this.translate.nameGerman(),
        ariaLabel: this.translate.ariaTranslationLabel(),
        lang: this.language.DE,
        welcomeText: this.translate.welcomeTextGerman(),
        isActive: lng === this.language.DE,
      },
      {
        langName: this.translate.nameEnglish(),
        ariaLabel: this.translate.ariaTranslationLabel(),
        lang: this.language.EN,
        welcomeText: this.translate.welcomeTextGerman(),
        isActive: lng === this.language.EN,
      },
      {
        langName: this.translate.nameSpanish(),
        ariaLabel: this.translate.ariaTranslationLabel(),
        lang: this.language.ES,
        welcomeText: this.translate.welcomeTextSpanish(),
        isActive: lng === this.language.ES,
      },
    ]);

    this.isLoading = false;
  }
}
