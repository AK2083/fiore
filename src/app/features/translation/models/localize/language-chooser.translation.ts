import { Signal } from '@angular/core';

export interface Translations {
  title: Signal<string>;
  nameGerman: Signal<string>;
  nameEnglish: Signal<string>;
  nameSpanish: Signal<string>;
  ariaTranslationLabel: Signal<string>;
  welcomeTextGerman: Signal<string>;
  welcomeTextEnglish: Signal<string>;
  welcomeTextSpanish: Signal<string>;
}
