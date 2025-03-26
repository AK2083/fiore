import { Injectable } from '@angular/core';
import { _, TranslateService } from '@ngx-translate/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';

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
      de: this.translate.get(_('app.langNames.de')).pipe(
        switchMap((langName) =>
          this.translate.get(_('app.aria.translationLabel'), { lang: langName }).pipe(
            map((ariaLabel) => ({ langName, ariaLabel }))
          )
        )
      ),
      en: this.translate.get(_('app.langNames.en')).pipe(
        switchMap((langName) =>
          this.translate.get(_('app.aria.translationLabel'), { lang: langName }).pipe(
            map((ariaLabel) => ({ langName, ariaLabel }))
          )
        )
      ),
      es: this.translate.get(_('app.langNames.es')).pipe(
        switchMap((langName) =>
          this.translate.get(_('app.aria.translationLabel'), { lang: langName }).pipe(
            map((ariaLabel) => ({ langName, ariaLabel }))
          )
        )
      )
    });
  }

  public getTranslationTitle() {
    return this.getTranslationOf(_('app.title'));
  }

  public getIconSRSupport() {
    return this.getTranslationOf(_('app.aria.iconLabel'));
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
