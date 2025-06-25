import { inject, Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationWrapperService {
  private translate = inject(TranslateService);

  setLanguage(lang: string) {
    this.translate.use(lang);
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang;
  }

  getAvailableLanguages(): string[] {
    return this.translate.getLangs();
  }

  t(key: string, params?: Record<string, any>): Signal<string> {
    return toSignal(this.translate.stream(key, params), {
      initialValue: this.translate.instant(key, params),
    });
  }
}
