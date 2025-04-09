import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { LanguageNames } from '../translation.service';

@Injectable({
  providedIn: 'root',
})
export class TranslationServiceMock {
  getTranslationTitle = jasmine
    .createSpy()
    .and.returnValue(of('Choose Language'));
  getIconSRSupport = jasmine.createSpy().and.returnValue(of('Globe Icon'));
  getCurrentLanguage = jasmine.createSpy().and.returnValue('en');
  getDefaultLanguage = jasmine.createSpy().and.returnValue('en');
  getLanguageNames = jasmine.createSpy().and.returnValue(
    of({
      de: {
        langName: 'Deutsch',
        ariaLabel: 'Deutsch wählen',
        welcomeText: 'Willkommen',
      },
      en: {
        langName: 'English',
        ariaLabel: 'Select English',
        welcomeText: 'Welcome',
      },
      es: {
        langName: 'Español',
        ariaLabel: 'Seleccionar Español',
        welcomeText: 'Bienvenido',
      },
    } as LanguageNames),
  );
  setSelectedLanguage = jasmine.createSpy().and.stub();
}
