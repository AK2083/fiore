import { Signal } from "@angular/core";

export type RegisterTranslation = {
    title: Signal<string>;
    subtitle: Signal<string>;
    mail: Signal<string>;
    password: Signal<string>;
    confirmation: Signal<string>;
    success: Signal<string>;
    reset: Signal<string>;
    linkExpired: Signal<string>;
    timeout: Signal<string>;
    failed: Signal<string>;
    mailRequired: Signal<string>;
    mailWrong: Signal<string>;
    passwordRequired: Signal<string>;
    passwordWrong: Signal<string>;
    passwordNumber: Signal<string>;
    passwordSpecialChars: Signal<string>;
    passwordUppercase: Signal<string>;
    passwordMinLength: Signal<string>;
    question: Signal<string>;
    exclamation: Signal<string>;
  };