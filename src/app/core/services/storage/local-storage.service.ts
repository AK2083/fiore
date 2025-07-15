import { Injectable } from '@angular/core';
import { GetLocalStorageException } from '@core/models/error/getLocalStorageException';
import { SetLocalStorageException } from '@core/models/error/setLocalStorageException';
import { DisplayType } from '@core/models/messages/user.message.model';
import { scopedLoggerFactory } from '@core/utils/logging/scope.logger.factory';
import { SupabaseService } from '@features/auth/services/supabase/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private loggerService = scopedLoggerFactory(SupabaseService);

  setLocalStorage(key: string, value: string) {
    try {
      localStorage.setItem(key, value);
      this.loggerService.log('LocalStorage: Set item', `${key} = ${value}`);
    } catch (e) {
      this.loggerService.error('LocalStorage Error: Failed to set item', [
        `${key} = ${value}`,
        e,
      ]);
      throw new SetLocalStorageException({
        title: 'LocalStorage setting error',
        message: 'LocalStorage Error: Failed to set item',
        details: { ['LOCAL_STORAGE_ERROR']: e },
        code: 'LOCAL_STORAGE_ERROR',
        displayType: DisplayType.None,
        severity: 'danger',
      });
    }
  }

  getLocalStorage(key: string): string | null {
    try {
      const item = localStorage.getItem(key);
      this.loggerService.log('LocalStorage: Got item', `${key} = ${item}`);
      return item;
    } catch (e) {
      this.loggerService.error('LocalStorage Error: Failed to get item', [
        key,
        e,
      ]);
      throw new GetLocalStorageException({
        title: 'LocalStorage getting error',
        message: 'LocalStorage Error: Failed to get item',
        details: { ['LOCAL_STORAGE_ERROR']: e },
        code: 'LOCAL_STORAGE_ERROR',
        displayType: DisplayType.None,
        severity: 'danger',
      });
    }
  }
}
