import { Signal } from '@angular/core';

export interface LanguageModel {
  langName: Signal<string>;
  ariaLabel: Signal<string>;
  lang: string;
  welcomeText: Signal<string>;
  isActive: boolean;
}
