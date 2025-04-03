import { TestBed } from '@angular/core/testing';
import { TranslationService, LanguageNames } from './translation.service';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('TranslationService', () => {
  let service: TranslationService;
  let mockTranslateService: jasmine.SpyObj<TranslateService>;

  beforeEach(() => {
    mockTranslateService = jasmine.createSpyObj('TranslateService', ['get', 'use', 'stream'], {
      defaultLang: 'en',
      currentLang: 'de'
    });

    TestBed.configureTestingModule({
      providers: [
        TranslationService,
        { provide: TranslateService, useValue: mockTranslateService }
      ]
    });

    service = TestBed.inject(TranslationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return correct language names from getLanguageNames()', (done) => {
    // Mock-Rückgabe für die `get`-Methode von ngx-translate
    mockTranslateService.get.and.callFake((key: string) => {
      const translations: Record<string, string> = {
        'app.language.names.de': 'Deutsch',
        'app.language.names.en': 'English',
        'app.language.names.es': 'Español',
        'app.aria.translationLabel': 'Translation Label',
        'app.language.subtitles.welcomeTextDE': 'Willkommen',
        'app.language.subtitles.welcomeTextEN': 'Welcome',
        'app.language.subtitles.welcomeTextES': 'Bienvenido'
      };
      return of(translations[key] || '');
    });

    service.getLanguageNames().subscribe((result: LanguageNames) => {
      expect(result.de.langName).toBe('Deutsch');
      expect(result.de.ariaLabel).toBe('Translation Label');
      expect(result.de.welcomeText).toBe('Willkommen');

      expect(result.en.langName).toBe('English');
      expect(result.en.ariaLabel).toBe('Translation Label');
      expect(result.en.welcomeText).toBe('Welcome');

      expect(result.es.langName).toBe('Español');
      expect(result.es.ariaLabel).toBe('Translation Label');
      expect(result.es.welcomeText).toBe('Bienvenido');

      done();
    });
  });

  it('should return the translation title', () => {
    mockTranslateService.stream.and.returnValue(of('Test Title'));
    
    service.getTranslationTitle().subscribe((title) => {
      expect(title).toBe('Test Title');
    });

    expect(mockTranslateService.stream).toHaveBeenCalledWith('app.title');
  });

  it('should return the icon screen reader support translation', () => {
    mockTranslateService.stream.and.returnValue(of('Icon Label'));

    service.getIconSRSupport().subscribe((label) => {
      expect(label).toBe('Icon Label');
    });

    expect(mockTranslateService.stream).toHaveBeenCalledWith('app.aria.iconLabel');
  });

  it('should return the default language', () => {
    expect(service.getDefaultLanguage()).toBe('en');
  });

  it('should return the current language', () => {
    expect(service.getCurrentLanguage()).toBe('de');
  });

  it('should set the selected language', () => {
    service.setSelectedLanguage('es');
    expect(mockTranslateService.use).toHaveBeenCalledWith('es');
  });
});
