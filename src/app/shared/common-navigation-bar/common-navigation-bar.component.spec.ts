import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonNavigationBarComponent } from './common-navigation-bar.component';
import { TranslationService } from '../services/translation.service';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';

describe('CommonNavigationBarComponent', () => {
  let component: CommonNavigationBarComponent;
  let fixture: ComponentFixture<CommonNavigationBarComponent>;
  let mockTranslationService: jasmine.SpyObj<TranslationService>;

  beforeEach(async () => {
    mockTranslationService = jasmine.createSpyObj('TranslationService', ['getIconSRSupport']);
    mockTranslationService.getIconSRSupport.and.returnValue(of('Mocked SR Label'));

    await TestBed.configureTestingModule({
      imports: [CommonNavigationBarComponent],
      providers: [provideRouter([]), { provide: TranslationService, useValue: mockTranslationService }]
    }).compileComponents();

    fixture = TestBed.createComponent(CommonNavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle language menu', () => {
    expect(component.isLanguageMenuOpen).toBeFalse();
    component.openLanguageMenu();
    expect(component.isLanguageMenuOpen).toBeTrue();
    component.openLanguageMenu();
    expect(component.isLanguageMenuOpen).toBeFalse();
  });

  it('should toggle mobile menu', () => {
    expect(component.isMobileMenuOpen).toBeFalse();
    component.openMobileMenu();
    expect(component.isMobileMenuOpen).toBeTrue();
    component.openMobileMenu();
    expect(component.isMobileMenuOpen).toBeFalse();
  });

  it('should close language menu on escape key', () => {
    component.isLanguageMenuOpen = true;
    component.onEscapeKeydown();
    expect(component.isLanguageMenuOpen).toBeFalse();
  });

  it('should close language menu if window is resized below 768px', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(500);
    component.isLanguageMenuOpen = true;
    component.onDocumentClick();
    expect(component.isLanguageMenuOpen).toBeFalse();
  });

  it('should close mobile menu if window is resized above 768px', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(1000);
    component.isMobileMenuOpen = true;
    component.onDocumentClick();
    expect(component.isMobileMenuOpen).toBeFalse();
  });

  it('should render a route item', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('a')?.textContent).toContain('Home');
  });
});
