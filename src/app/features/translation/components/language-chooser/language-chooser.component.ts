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
import { ScopedLogger } from '@core/helper/logging/scope.logger';
import { scopedLoggerFactory } from '@core/helper/logging/scope.logger.factory';

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
  providers: [
    {
      provide: ScopedLogger,
      useFactory: () => scopedLoggerFactory(LanguageChooserComponent),
    },
  ],
})
export class LanguageChooserComponent implements OnInit {
  private translationService = inject(TranslationService);
  private loggerService = inject(ScopedLogger);

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
  } as Translations;

  ngOnInit() {
    const lang =
      this.translationService.getCurrentLanguage() ||
      this.translationService.getDefaultLanguage();

    this.loggerService.log('Initializing with language', lang);

    this.loadLanguageItems(lang);
  }

  changeLanguageEvent(langType: string) {
    this.loggerService.log('User selected new language', langType);
    this.translationService.setSelectedLanguage(langType);
    this.loadLanguageItems(langType);
  }

  loadLanguageItems(lng: string) {
    this.loggerService.log('Loading language items for', lng);

    this.langItems.set([
      {
        langName: this.translations.nameGerman,
        ariaLabel: this.translations.ariaTranslationLabel,
        lang: this.language.DE,
        welcomeText: this.translations.welcomeTextGerman,
        isActive: lng === this.language.DE,
      },
      {
        langName: this.translations.nameEnglish,
        ariaLabel: this.translations.ariaTranslationLabel,
        lang: this.language.EN,
        welcomeText: this.translations.welcomeTextEnglish,
        isActive: lng === this.language.EN,
      },
      {
        langName: this.translations.nameSpanish,
        ariaLabel: this.translations.ariaTranslationLabel,
        lang: this.language.ES,
        welcomeText: this.translations.welcomeTextSpanish,
        isActive: lng === this.language.ES,
      },
    ]);

    this.isLoading = false;
    this.loggerService.log('Language items loaded and state updated');
  }
}
