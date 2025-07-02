export enum ErrorType {
  'error',
  'warning',
  'information',
}

export interface CommonError {
  type: ErrorType;

  userMessage: string;

  additionalMessage: string;

  icon?: string;
}
