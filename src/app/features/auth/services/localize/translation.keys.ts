export const APP_TRANSLATION_KEYS = {
  TITLE: 'app.register.title',
  SUBTITLE: 'app.register.subtitle',
  MAIL: 'app.register.mail',
  PASSWORD: 'app.register.password',
  CONFIRMATION: 'app.register.confirmation',
  QUESTION: 'app.register.question',
  EXCLAMATION: 'app.register.exclamation',
  PASSWORD_RULES: {
    MIN_LENGTH: 'app.register.passwordRules.minLength',
    UC_CHARS: 'app.register.passwordRules.ucChars',
    NUMBER: 'app.register.passwordRules.number',
    SPECIAL_CHARS: 'app.register.passwordRules.specialChars',
  },
  SUCCESS: 'app.register.success',
  RESET: 'app.register.reset',
  LINK_EXPIRED: 'app.register.linkExpired',
  AUTH_ERROR: 'app.register.authError',
  ERROR: {
    TIMEOUT: 'app.register.error.timeout',
    FAILED: 'app.register.error.failed',
    MAIL: {
      REQUIRED: 'app.register.error.mail.required',
      WRONG: 'app.register.error.mail.wrong',
    },
    PASSWORD: {
      REQUIRED: 'app.register.error.password.required',
      WRONG: 'app.register.error.password.wrong',
    },
  },
} as const;
