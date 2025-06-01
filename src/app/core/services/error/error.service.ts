import { Injectable } from '@angular/core';

export enum ErrorType {
  "error",
  "warning",
  "information"
}

type ErrorIcon = {
  [key in ErrorType]: string;
};

export const ErrorIcons: ErrorIcon = {
  [ErrorType.error]: "icon_error_kreuz", // Beispiel: Spezifischere Icon-Namen
  [ErrorType.warning]: "icon_warning_dreieck",
  [ErrorType.information]: "icon_info_i"
};

export type CommonError = {
  type: ErrorType,
  userMessage: string,
  additionalMessage: string,
  icon?: string
}

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  errors: CommonError[] = [];

  constructor() { }

  addError() {
    
  }
}
