import {
  inject,
  Injectable,
  Injector,
  runInInjectionContext,
  Signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { scopedLoggerFactory } from '@core/utils/logging/scope.logger.factory';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationWrapperService {
  private translate = inject(TranslateService);
  private loggerService = scopedLoggerFactory(TranslationWrapperService);
  private readonly injector = inject(Injector);

  setLanguage(lang: string) {
    this.translate.use(lang);
  }

  getCurrentLanguage(): string {
    this.loggerService.log('Get language', this.translate.currentLang);
    return this.translate.currentLang;
  }

  getAvailableLanguages(): string[] {
    this.loggerService.log('Get languages', this.translate.getLangs());
    return this.translate.getLangs();
  }

  getDefaultLanguage(): string {
    this.loggerService.log('Get default lang', this.translate.defaultLang);
    return this.translate.defaultLang;
  }

  t(key: string, params?: Record<string, number | string>): Signal<string> {
    return runInInjectionContext(this.injector, () => {
      return toSignal(this.translate.stream(key, params), {
        initialValue: this.translate.instant(key, params),
      });
    });
  }
}
