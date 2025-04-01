import { Injectable } from '@angular/core';
import { _, TranslateService } from '@ngx-translate/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';

export interface LanguageNames {
  de: {
    langName: string,
    ariaLabel: string,
    welcomeText: string
  },
  en: {
    langName: string,
    ariaLabel: string,
    welcomeText: string
  },
  es: {
    langName: string,
    ariaLabel: string,
    welcomeText: string
  },
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(public translate: TranslateService) { }

  getLanguageNames(): Observable<LanguageNames> {
    return forkJoin({
      de: this.translate.get('app.language.names.de').pipe(
        switchMap((langName) =>
          forkJoin({
            langName: this.translate.get('app.language.names.de'),
            ariaLabel: this.translate.get('app.aria.translationLabel', {
              lang: langName,
            }),
            welcomeText: this.translate.get('app.language.subtitles.welcomeTextDE'),
          }).pipe(
            map((texts) => ({
              langName: texts.langName,
              ariaLabel: texts.ariaLabel,
              welcomeText: texts.welcomeText,
            }))
          )
        )
      ),
      en: this.translate.get('app.language.names.en').pipe(
        switchMap((langName) =>
          forkJoin({
            langName: this.translate.get('app.language.names.en'),
            ariaLabel: this.translate.get('app.aria.translationLabel', {
              lang: langName,
            }),
            welcomeText: this.translate.get('app.language.subtitles.welcomeTextEN'),
          }).pipe(
            map((texts) => ({
              langName: texts.langName,
              ariaLabel: texts.ariaLabel,
              welcomeText: texts.welcomeText,
            }))
          )
        )
      ),
      es: this.translate.get('app.language.names.es').pipe(
        switchMap((langName) =>
          forkJoin({
            langName: this.translate.get('app.language.names.es'),
            ariaLabel: this.translate.get('app.aria.translationLabel', {
              lang: langName,
            }),
            welcomeText: this.translate.get('app.language.subtitles.welcomeTextES'),
          }).pipe(
            map((texts) => ({
              langName: texts.langName,
              ariaLabel: texts.ariaLabel,
              welcomeText: texts.welcomeText,
            }))
          )
        )
      ),
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
