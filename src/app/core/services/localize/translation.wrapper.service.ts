import { inject, Injectable, Injector, runInInjectionContext, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationWrapperService {
  private translate = inject(TranslateService);
  private readonly injector = inject(Injector);
  
  setLanguage(lang: string) {
    this.translate.use(lang);
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang;
  }

  getAvailableLanguages(): string[] {
    return this.translate.getLangs();
  }

  getDefaultLanguage(): string {
    return this.translate.defaultLang;
  }

  t(key: string, params?: Record<string, any>): Signal<string> {
    return runInInjectionContext(this.injector, () => {
      // Stelle sicher, dass der initialValue korrekt geholt wird,
      // auch wenn der Observable noch nicht emittiert hat.
      return toSignal(this.translate.stream(key, params), {
        initialValue: this.translate.instant(key, params),
      });
    });
  }
}
