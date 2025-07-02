import { ErrorType } from '../messages/error.message.model';

type ErrorIcon = Record<ErrorType, string>;

export const ErrorIcons: ErrorIcon = {
  [ErrorType.error]: 'icon_error_kreuz', // Beispiel: Spezifischere Icon-Namen
  [ErrorType.warning]: 'icon_warning_dreieck',
  [ErrorType.information]: 'icon_info_i',
};
