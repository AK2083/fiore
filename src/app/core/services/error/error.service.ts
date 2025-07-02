import { Injectable, signal, WritableSignal } from '@angular/core';
import { CommonError } from '@core/models/messages/error.message.model';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  errors: WritableSignal<CommonError[]> = signal([]);

  addError(error: CommonError): void {
    this.errors.update((currentErrors) => [...currentErrors, error]);
  }

  clearErrors(): void {
    this.errors.set([]);
  }

  getLatestError(): CommonError | null {
    const currentErrors = this.errors();
    return currentErrors.length > 0
      ? currentErrors[currentErrors.length - 1]
      : null;
  }
}
