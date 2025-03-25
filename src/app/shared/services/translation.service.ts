import { Injectable } from '@angular/core';
import { _, TranslateService } from '@ngx-translate/core';
import { forkJoin, Observable } from 'rxjs';

export type LanguageNames = {
  de: {
    langName: string,
    ariaLabel: string
  },
  en: {
    langName: string,
    ariaLabel: string
  },
  es: {
    langName: string,
    ariaLabel: string
  },
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(public translate: TranslateService) { }

  public getLanguageNames(): Observable<LanguageNames> {
    return forkJoin({
      de: forkJoin({
        langName: this.translate.get(_('app.langNames.de')),
        ariaLabel: this.translate.get(_('app.ariaLabel'))
      }),
      en: forkJoin({
        langName: this.translate.get(_('app.langNames.en')),
        ariaLabel: this.translate.get(_('app.ariaLabel'))
      }),
      es: forkJoin({
        langName: this.translate.get(_('app.langNames.es')),
        ariaLabel: this.translate.get(_('app.ariaLabel'))
      })
    });
  }

  public getTranslationTitle() {
    return this.getTranslationOf(_('app.title'));
  }

  public getDefaultLanguage() {
    return this.translate.defaultLang;
  }

  public getCurrentLanguage() {
    return this.translate.currentLang;
  }

  public setSelectedLanguage(lang: string) {
    this.translate.use(lang);
  }

  private getTranslationOf(content: string) {
    return this.translate.stream(content);
  }
}
