import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageChooserComponent } from './language-chooser.component';
import { TranslationService } from '../../shared/services/translation.service';
import { of, throwError } from 'rxjs';
import { LanguageNames } from '../../shared/services/translation.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LanguageChooserComponent', () => {
  let component: LanguageChooserComponent;
  let fixture: ComponentFixture<LanguageChooserComponent>;
  let translationServiceMock: jasmine.SpyObj<TranslationService>;

  beforeEach(async () => {
    translationServiceMock = jasmine.createSpyObj('TranslationService', [
      'getTranslationTitle',
      'getIconSRSupport',
      'getCurrentLanguage',
      'getDefaultLanguage',
      'getLanguageNames',
      'setSelectedLanguage'
    ]);

    translationServiceMock.getTranslationTitle.and.returnValue(of('Choose Language'));
    translationServiceMock.getIconSRSupport.and.returnValue(of('Globe Icon'));
    translationServiceMock.getCurrentLanguage.and.returnValue('en');
    translationServiceMock.getDefaultLanguage.and.returnValue('en');
    translationServiceMock.getLanguageNames.and.returnValue(of({
      de: { langName: 'Deutsch', ariaLabel: 'Deutsch wählen', welcomeText: 'Willkommen' },
      en: { langName: 'English', ariaLabel: 'Select English', welcomeText: 'Welcome' },
      es: { langName: 'Español', ariaLabel: 'Seleccionar Español', welcomeText: 'Bienvenido' }
    } as LanguageNames));

    await TestBed.configureTestingModule({
      imports: [LanguageChooserComponent],
      providers: [
        { provide: TranslationService, useValue: translationServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignore unknown elements in the template
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load language items on init', () => {
    expect(component.langItems.length).toBe(3);
    expect(component.isLoading).toBeFalse();
  });

  it('should update language items when language is changed', () => {
    component.changeLanguageEvent('de');
    expect(translationServiceMock.setSelectedLanguage).toHaveBeenCalledWith('de');
    expect(component.langItems.some(item => item.isActive && item.lang === 'de')).toBeTrue();
  });

  it('should handle errors when loading language names', () => {
    spyOn(console, 'error');
    translationServiceMock.getLanguageNames.and.returnValue(throwError(() => new Error('API Error')));
    component.loadLanguageItems('en');
    expect(console.error).toHaveBeenCalled();
  });
});
