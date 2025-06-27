import { inject, Injectable, Signal } from '@angular/core';
import { TranslationWrapperService } from '@core/services/localize/translation.wrapper.service';
import { APP_TRANSLATION_KEYS } from '@features/translation/services/localize/translation.keys';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translate = inject(TranslationWrapperService);
  KEYS = APP_TRANSLATION_KEYS;

  title(): Signal<string> {
    return this.translate.t(this.KEYS.TITLE);
  }

  nameGerman(): Signal<string> {
    return this.translate.t(this.KEYS.LANGUAGE.NAMES.DE);
  }

  nameEnglish(): Signal<string> {
    return this.translate.t(this.KEYS.LANGUAGE.NAMES.EN);
  }

  nameSpanish(): Signal<string> {
    return this.translate.t(this.KEYS.LANGUAGE.NAMES.ES);
  }

  welcomeTextGerman(): Signal<string> {
    return this.translate.t(this.KEYS.LANGUAGE.SUBTITLES.WELCOME_TEXT_DE);
  }

  welcomeTextEnglish(): Signal<string> {
    return this.translate.t(this.KEYS.LANGUAGE.SUBTITLES.WELCOME_TEXT_EN);
  }

  welcomeTextSpanish(): Signal<string> {
    return this.translate.t(this.KEYS.LANGUAGE.SUBTITLES.WELCOME_TEXT_ES);
  }

  ariaTranslationLabel(): Signal<string> {
    return this.translate.t(this.KEYS.ARIA.TRANSLATION_LABEL);
  }

  ariaIconLabel(): Signal<string> {
    return this.translate.t(this.KEYS.ARIA.ICON_LABEL);
  }

  getDefaultLanguage() {
    return this.translate.getDefaultLanguage();
  }

  getCurrentLanguage() {
    return this.translate.getCurrentLanguage();
  }

  setSelectedLanguage(lang: string) {
    this.translate.setLanguage(lang);
  }
}
