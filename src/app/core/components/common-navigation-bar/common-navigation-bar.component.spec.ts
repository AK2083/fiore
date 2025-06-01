import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonNavigationBarComponent } from './common-navigation-bar.component';
import { TranslationService } from '../services/translation.service';
import { provideRouter } from '@angular/router';
import { TranslationServiceMock } from '../services/mocks/translation-service-mock.service';
import { DashboardComponent } from '../designsystem/icons/dashboard/dashboard.component';

describe('CommonNavigationBarComponent', () => {
  let component: CommonNavigationBarComponent;
  let fixture: ComponentFixture<CommonNavigationBarComponent>;
  const mockLocalStorage: Record<string, string> = {};
  let mockTranslationService: TranslationServiceMock;

  beforeEach(async () => {
    mockTranslationService = new TranslationServiceMock();

    await TestBed.configureTestingModule({
      imports: [CommonNavigationBarComponent, DashboardComponent],
      providers: [
        provideRouter([]),
        { provide: TranslationService, useValue: mockTranslationService },
      ],
    }).compileComponents();

    spyOn(localStorage, 'getItem').and.callFake(
      (key: string) => mockLocalStorage[key] || null,
    );
    spyOn(localStorage, 'setItem').and.callFake(
      (key: string, value: string) => {
        mockLocalStorage[key] = value;
      },
    );
    spyOn(localStorage, 'removeItem').and.callFake((key: string) => {
      delete mockLocalStorage[key];
    });
    spyOn(console, 'error');

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
    component.onWindowResize();
    expect(component.isLanguageMenuOpen).toBeFalse();
  });

  it('should close mobile menu if window is resized above 768px', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(1000);
    component.isMobileMenuOpen = true;
    component.onWindowResize();
    expect(component.isMobileMenuOpen).toBeFalse();
  });

  it('should render the "Home" icon component', () => {
    component.routeItems = [
      {
        name: 'Home',
        route: '/home',
        isActive: true,
        routeIcon: DashboardComponent,
      },
    ];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const homeIcon = compiled.querySelector('app-dashboard'); // Passe den Selektor an den tatsächlichen Tag deiner HomeIconComponent an
    expect(homeIcon).toBeTruthy();
  });

  it('should set and get local storage item', () => {
    const key = 'testKey';
    const value = 'testValue';

    component.setLocalStorage(key, value);
    expect(localStorage.setItem).toHaveBeenCalledWith(key, value);
    expect(mockLocalStorage[key]).toBe(value);

    const retrievedValue = component.getLocalStorage(key);
    expect(localStorage.getItem).toHaveBeenCalledWith(key);
    expect(retrievedValue).toBe(value);
  });

  it('should handle setLocalStorage error', () => {
    (localStorage.setItem as jasmine.Spy).and.throwError('setItem error');
    component.setLocalStorage('key', 'value');
    expect(console.error).toHaveBeenCalledWith(new Error('setItem error'));
  });

  it('should handle getLocalStorage error', () => {
    (localStorage.getItem as jasmine.Spy).and.throwError('getItem error');
    const result = component.getLocalStorage('key');
    expect(console.error).toHaveBeenCalledWith(new Error('getItem error'));
    expect(result).toBeNull();
  });

  it('should enable dark mode if fioreTheme is dark in localStorage', () => {
    mockLocalStorage['fioreTheme'] = 'dark';
    const classListSpy = spyOn(document.documentElement.classList, 'add');
    component.ngOnInit();
    expect(component.isDarkModeOn).toBeTrue();
    expect(classListSpy).toHaveBeenCalledWith('dark');
  });

  it('should enable dark mode if document has class dark', () => {
    delete mockLocalStorage['fioreTheme'];
    spyOn(document.documentElement.classList, 'contains').and.callFake(
      (className) => className === 'dark',
    );
    const classListSpy = spyOn(document.documentElement.classList, 'add');
    component.ngOnInit();
    expect(component.isDarkModeOn).toBeTrue();
    expect(classListSpy).toHaveBeenCalledWith('dark');
  });

  it('should enable dark mode if document has class dark', () => {
    delete mockLocalStorage['fioreTheme'];
    spyOn(document.documentElement.classList, 'contains').and.callFake(
      (className) => className === 'dark',
    );
    const classListSpy = spyOn(document.documentElement.classList, 'add');
    component.ngOnInit();
    expect(component.isDarkModeOn).toBeTrue();
    expect(classListSpy).toHaveBeenCalledWith('dark');
  });

  it('should disable dark mode and update localStorage', () => {
    component.isDarkModeOn = true;
    const toggleSpy = spyOn(document.documentElement.classList, 'toggle');
    component.toggleTheme();
    expect(component.isDarkModeOn).toBeFalse();
    expect(toggleSpy).toHaveBeenCalledWith('dark');
    expect(mockLocalStorage['fioreTheme']).toBe('light');
  });

  it('should show sun icon when isDarkModeOn is true', () => {
    component.isDarkModeOn = true;
    fixture.detectChanges();
    const sunIcon = fixture.nativeElement.querySelector('app-sun');
    const moonIcon = fixture.nativeElement.querySelector('app-moon');
    expect(sunIcon).toBeTruthy();
    expect(moonIcon).toBeFalsy();
  });

  it('should show moon icon when isDarkModeOn is false', () => {
    component.isDarkModeOn = false;
    fixture.detectChanges();
    const sunIcon = fixture.nativeElement.querySelector('app-sun');
    const moonIcon = fixture.nativeElement.querySelector('app-moon');
    expect(sunIcon).toBeFalsy();
    expect(moonIcon).toBeTruthy();
  });

  it('should show language drawer when isLanguageMenuOpen is true', () => {
    component.isLanguageMenuOpen = true;
    fixture.detectChanges();
    const drawer = fixture.nativeElement.querySelector('app-drawer');
    expect(drawer).toBeTruthy();
  });
});
