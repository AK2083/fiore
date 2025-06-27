import { inject, Injectable, Signal } from '@angular/core';
import { TranslationWrapperService } from './translation.wrapper.service';
import { APP_TRANSLATION_KEYS } from '@core/services/localize/translation.keys';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private translate = inject(TranslationWrapperService);
  KEYS = APP_TRANSLATION_KEYS;

  iconLabel(): Signal<string> {
    return this.translate.t(this.KEYS.SCREENREADER.ICON_LABEL);
  }
}
