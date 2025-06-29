import { NgComponentOutlet, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DrawerComponent } from '@shared/components/misc/drawer/drawer.component';
import { IconButtonComponent } from '@shared/components/buttons/icon-button/icon-button.component';
import { LanguageChooserComponent } from '@features/translation/components/language-chooser/language-chooser.component';
import { GlobeComponent } from '@shared/components/misc/icons/globe.component';
import { MoonComponent } from '@shared/components/misc/icons/moon.component';
import { SunComponent } from '@shared/components/misc/icons/sun.component';
import { BurgerComponent } from '@shared/components/misc/icons/burger.component';
import { RegisterComponent } from '@shared/components/misc/icons/register.component';
import { TranslationService } from '@core/services/localize/translation.service';
import { NavigationTranslation } from '@core/models/localize/common-navigation.translation';
import { LoggerService } from '@core/services/logging/logger.service';

@Component({
  selector: 'app-common-navigation-bar',
  imports: [
    NgIf,
    NgFor,
    RouterLink,
    LanguageChooserComponent,
    IconButtonComponent,
    DrawerComponent,
    GlobeComponent,
    MoonComponent,
    SunComponent,
    BurgerComponent,
    NgStyle,
    NgComponentOutlet,
  ],
  templateUrl: './common-navigation-bar.component.html',
})
export class CommonNavigationBarComponent implements OnInit {
  private translationService = inject(TranslationService);
  private loggerService = inject(LoggerService);

  isMobileMenuOpen = false;
  isLanguageMenuOpen = false;
  isDarkModeOn = true;

  routeItems = [
    {
      name: 'Auth',
      route: '/auth',
      isActive: true,
      icon: RegisterComponent,
    },
  ];

  translation = {
    srIconLabel: this.translationService.iconLabel(),
  } as NavigationTranslation;

  iconInputs: Record<string, unknown> = {
    styleClass: 'size-6',
  };

  COMPONENTNAME = '';

  constructor() {
    this.COMPONENTNAME = this.constructor.name;
  }

  ngOnInit(): void {
    const storedTheme = this.getLocalStorage('fioreTheme');
    this.logMe('Theme from localStorage:', storedTheme);
    this.logMe(
      'Document has "dark" class initially:',
      document.documentElement.classList.contains('dark'),
    );

    this.isDarkModeOn =
      storedTheme === 'dark' ||
      document.documentElement.classList.contains('dark');

    this.logMe('Initial isDarkModeOn:', this.isDarkModeOn);
    if (this.isDarkModeOn) {
      document.documentElement.classList.add('dark');
      this.logMe('Added "dark" class to document.documentElement');
    }
  }

  openLanguageMenu() {
    this.logMe('Before toggling language menu:', this.isLanguageMenuOpen);
    this.isLanguageMenuOpen = !this.isLanguageMenuOpen;
    this.logMe('After toggling language menu:', this.isLanguageMenuOpen);
  }

  openMobileMenu() {
    this.logMe('Before toggling mobile menu:', this.isMobileMenuOpen);
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    this.logMe('After toggling mobile menu:', this.isMobileMenuOpen);
  }

  toggleTheme() {
    this.logMe('Before toggling theme:', this.isDarkModeOn);
    this.isDarkModeOn = !this.isDarkModeOn;
    this.logMe('After toggling theme:', this.isDarkModeOn);
    document.documentElement.classList.toggle('dark');
    this.setLocalStorage('fioreTheme', this.isDarkModeOn ? 'dark' : 'light');
    this.logMe('Theme set in localStorage:', this.isDarkModeOn ? 'dark' : 'light');
  }

  setLocalStorage(key: string, value: string) {
    try {
      localStorage.setItem(key, value);
      this.logMe(`LocalStorage: Set item '${key}' to '${value}'`);
    } catch (e) {
      this.errorMe(
        `LocalStorage Error: Failed to set item '${key}' with value '${value}'`,
        e,
      );
    }
  }

  getLocalStorage(key: string): string | null {
    try {
      const item = localStorage.getItem(key);
      this.logMe(`LocalStorage: Got item '${key}': '${item}'`);
      return item;
    } catch (e) {
      this.errorMe(
        `LocalStorage Error: Failed to get item '${key}'`,
        e,
      );
    }

    return null;
  }

  closeMenu() {
    this.logMe('Closing language menu.');
    this.isLanguageMenuOpen = false;
    this.logMe(
      'isLanguageMenuOpen after closeMenu:',
      this.isLanguageMenuOpen,
    );
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    if (window.innerWidth < 768) {
      if (this.isLanguageMenuOpen) {
        this.isLanguageMenuOpen = false;
        this.logMe(
          'Language menu closed due to window resize (< 768px)',
        );
      }
    }

    if (window.innerWidth > 768) {
      if (this.isMobileMenuOpen) {
        this.isMobileMenuOpen = false;
        this.logMe(
          'Mobile menu closed due to window resize (> 768px)',
        );
      }
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKeydown() {
    this.logMe('Escape key pressed.');
    if (this.isLanguageMenuOpen) {
      this.isLanguageMenuOpen = false;
      this.logMe('Language menu closed by escape key.');
    }
    if (this.isMobileMenuOpen) {
      this.isMobileMenuOpen = false;
      this.logMe('Mobile menu closed by escape key.');
    }
  }

  logMe(message: string, params?: unknown) {
    this.loggerService.log({
      scope: this.COMPONENTNAME,
      message: message,
      params: params,
    });
  }

  errorMe(message: string, params?: unknown) {
    this.loggerService.error({
      scope: this.COMPONENTNAME,
      message: message,
      params: params,
    });
  }
}
