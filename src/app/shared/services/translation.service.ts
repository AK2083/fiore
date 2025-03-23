import { Injectable } from '@angular/core';
import { _, TranslateService } from '@ngx-translate/core';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(public translate: TranslateService) { }

  getLanguageNames(): Observable<{ de: string, en: string, es: string }> {
    return forkJoin({
      de: this.translate.get(_('app.langNames.de')),
      en: this.translate.get(_('app.langNames.en')),
      es: this.translate.get(_('app.langNames.es'))
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
