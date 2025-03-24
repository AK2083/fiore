import { Injectable } from '@angular/core';
import { _, TranslateService } from '@ngx-translate/core';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(public translate: TranslateService) { }

  getLanguageNames(): Observable<{ 
    de: { langName: string, ariaLabel: string }, 
    en: { langName: string, ariaLabel: string }, 
    es: { langName: string, ariaLabel: string } 
  }> {
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

  getTranslationTitle() {
    return this.getTranslationOf(_('app.title'));
  }

  getDefaultLanguage() {
    return this.translate.defaultLang;
  }

  setSelectedLanguage(lang: string) {
    this.translate.use(lang);
  }

  getTranslationOf(content: string) {
    return this.translate.get(content);
  }
}
