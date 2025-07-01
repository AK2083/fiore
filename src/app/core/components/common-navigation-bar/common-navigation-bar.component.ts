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
import { ScopedLogger } from '@core/utils/logging/scope.logger';
import { scopedLoggerFactory } from '@core/utils/logging/scope.logger.factory';

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
  providers: [
    {
      provide: ScopedLogger,
      useFactory: () => scopedLoggerFactory(CommonNavigationBarComponent),
    },
  ],
})
export class CommonNavigationBarComponent implements OnInit {
  private translationService = inject(TranslationService);
  private loggerService = inject(ScopedLogger);

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

  ngOnInit(): void {
    const storedTheme = this.getLocalStorage('fioreTheme');
    this.loggerService.log('Theme from localStorage:', storedTheme);
    this.loggerService.log(
      'Document has "dark" class initially:',
      document.documentElement.classList.contains('dark'),
    );

    this.isDarkModeOn =
      storedTheme === 'dark' ||
      document.documentElement.classList.contains('dark');

    this.loggerService.log('Initial isDarkModeOn:', this.isDarkModeOn);
    if (this.isDarkModeOn) {
      document.documentElement.classList.add('dark');
      this.loggerService.log('Added "dark" class to document.documentElement');
    }
  }

  openLanguageMenu() {
    this.loggerService.log(
      'Before toggling language menu:',
      this.isLanguageMenuOpen,
    );
    this.isLanguageMenuOpen = !this.isLanguageMenuOpen;
    this.loggerService.log(
      'After toggling language menu:',
      this.isLanguageMenuOpen,
    );
  }

  openMobileMenu() {
    this.loggerService.log(
      'Before toggling mobile menu:',
      this.isMobileMenuOpen,
    );
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    this.loggerService.log(
      'After toggling mobile menu:',
      this.isMobileMenuOpen,
    );
  }

  toggleTheme() {
    this.loggerService.log('Before toggling theme:', this.isDarkModeOn);
    this.isDarkModeOn = !this.isDarkModeOn;
    this.loggerService.log('After toggling theme:', this.isDarkModeOn);
    document.documentElement.classList.toggle('dark');
    this.setLocalStorage('fioreTheme', this.isDarkModeOn ? 'dark' : 'light');
    this.loggerService.log(
      'Theme set in localStorage:',
      this.isDarkModeOn ? 'dark' : 'light',
    );
  }

  setLocalStorage(key: string, value: string) {
    try {
      localStorage.setItem(key, value);
      this.loggerService.log('LocalStorage: Set item', `${key} = ${value}`);
    } catch (e) {
      this.loggerService.error('LocalStorage Error: Failed to set item', [
        `${key} = ${value}`,
        e,
      ]);
    }
  }

  getLocalStorage(key: string): string | null {
    try {
      const item = localStorage.getItem(key);
      this.loggerService.log('LocalStorage: Got item', `${key} = ${item}`);
      return item;
    } catch (e) {
      this.loggerService.error('LocalStorage Error: Failed to get item', [
        key,
        e,
      ]);
    }

    return null;
  }

  closeMenu() {
    this.loggerService.log('Closing language menu.');
    this.isLanguageMenuOpen = false;
    this.loggerService.log(
      'isLanguageMenuOpen after closeMenu:',
      this.isLanguageMenuOpen,
    );
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    if (window.innerWidth < 768) {
      if (this.isLanguageMenuOpen) {
        this.isLanguageMenuOpen = false;
        this.loggerService.log(
          'Language menu closed due to window resize (< 768px)',
        );
      }
    }

    if (window.innerWidth > 768) {
      if (this.isMobileMenuOpen) {
        this.isMobileMenuOpen = false;
        this.loggerService.log(
          'Mobile menu closed due to window resize (> 768px)',
        );
      }
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKeydown() {
    this.loggerService.log('Escape key pressed.');
    if (this.isLanguageMenuOpen) {
      this.isLanguageMenuOpen = false;
      this.loggerService.log('Language menu closed by escape key.');
    }
    if (this.isMobileMenuOpen) {
      this.isMobileMenuOpen = false;
      this.loggerService.log('Mobile menu closed by escape key.');
    }
  }
}
