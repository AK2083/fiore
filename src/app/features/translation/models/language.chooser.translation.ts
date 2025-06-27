import { Signal } from '@angular/core';

export type Translations = {
  title: Signal<string>;
  nameGerman: Signal<string>;
  nameEnglish: Signal<string>;
  nameSpanish: Signal<string>;
  ariaTranslationLabel: Signal<string>;
  welcomeTextGerman: Signal<string>;
  welcomeTextEnglish: Signal<string>;
  welcomeTextSpanish: Signal<string>;
};
