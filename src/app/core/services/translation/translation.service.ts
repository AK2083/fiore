import { inject, Injectable, Signal } from '@angular/core';
import { TranslationWrapperService } from './translation.wrapper.service';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private translate = inject(TranslationWrapperService);

  iconLabel(): Signal<string> {
    return this.translate.t('app.aria.iconLabel');
  }
}
