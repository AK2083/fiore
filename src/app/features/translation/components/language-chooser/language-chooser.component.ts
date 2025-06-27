import { Component, inject, OnInit, signal } from '@angular/core';
import { SimplePanelComponent } from '@shared/components/misc/simple-panel/simple-panel.component';
import { StatusButtonComponent } from '@shared/components/buttons/status-button/status-button.component';
import { NgFor, UpperCasePipe } from '@angular/common';
import { GlobeComponent } from '@shared/components/misc/icons/globe.component';
import { HeaderComponent } from '@shared/components/misc/header/header.component';
import { TranslationService } from '@features/translation/services/localize/translation.service';
import { Translations } from '@features/translation/models/localize/language-chooser.translation';
import { LanguageAbbrevations } from '@features/translation/models/localize/language.abbrevations';
import { LanguageModel } from '@features/translation/models/localize/language.model';

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
})
export class LanguageChooserComponent implements OnInit {
  private translationService = inject(TranslationService);

  langItems = signal<LanguageModel[]>([]);
  language = LanguageAbbrevations;
  isLoading = true;

  translations = {
    title: this.translationService.title(),
    nameGerman: this.translationService.nameGerman(),
    nameEnglish: this.translationService.nameEnglish(),
    nameSpanish: this.translationService.nameSpanish(),
    ariaTranslationLabel: this.translationService.ariaTranslationLabel(),
    welcomeTextGerman: this.translationService.welcomeTextGerman(),
    welcomeTextEnglish: this.translationService.welcomeTextEnglish(),
    welcomeTextSpanish: this.translationService.welcomeTextSpanish(),
  } as Translations

  ngOnInit() {
    const lang =
      this.translationService.getCurrentLanguage() ||
      this.translationService.getDefaultLanguage();
    this.loadLanguageItems(lang);
  }

  changeLanguageEvent(langType: string) {
    this.translationService.setSelectedLanguage(langType);
    this.loadLanguageItems(langType);
  }

  loadLanguageItems(lng: string) {
    this.langItems.set([
      {
        langName: this.translationService.nameGerman(),
        ariaLabel: this.translationService.ariaTranslationLabel(),
        lang: this.language.DE,
        welcomeText: this.translationService.welcomeTextGerman(),
        isActive: lng === this.language.DE,
      },
      {
        langName: this.translationService.nameEnglish(),
        ariaLabel: this.translationService.ariaTranslationLabel(),
        lang: this.language.EN,
        welcomeText: this.translationService.welcomeTextGerman(),
        isActive: lng === this.language.EN,
      },
      {
        langName: this.translationService.nameSpanish(),
        ariaLabel: this.translationService.ariaTranslationLabel(),
        lang: this.language.ES,
        welcomeText: this.translationService.welcomeTextSpanish(),
        isActive: lng === this.language.ES,
      },
    ]);

    this.isLoading = false;
  }
}
