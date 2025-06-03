import { Injectable, signal, WritableSignal } from '@angular/core';

export enum ErrorType {
  "error",
  "warning",
  "information"
}

type ErrorIcon = Record<ErrorType, string>;

export const ErrorIcons: ErrorIcon = {
  [ErrorType.error]: "icon_error_kreuz", // Beispiel: Spezifischere Icon-Namen
  [ErrorType.warning]: "icon_warning_dreieck",
  [ErrorType.information]: "icon_info_i"
};

export interface CommonError {
  type: ErrorType,
  userMessage: string,
  additionalMessage: string,
  icon?: string
}

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  errors: WritableSignal<CommonError[]> = signal([]);

  addError(error: CommonError): void {
    this.errors.update(currentErrors => [...currentErrors, error]);
  }

  clearErrors(): void {
    this.errors.set([]);
  }

  getLatestError(): CommonError | null {
    const currentErrors = this.errors();
    return currentErrors.length > 0 ? currentErrors[currentErrors.length - 1] : null;
  }
}
