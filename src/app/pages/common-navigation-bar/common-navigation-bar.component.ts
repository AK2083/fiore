import {
  AsyncPipe,
  NgFor,
  NgIf,
  NgStyle,
} from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TranslationService } from '../../shared/services/translation.service';
import { Observable, of } from 'rxjs';
import { DrawerComponent } from '../../shared/designsystem/molecules/drawer/drawer.component';
import { IconButtonComponent } from '../../shared/designsystem/atoms/icon-button/icon-button.component';
import { LanguageChooserComponent } from '../translation/language-chooser/language-chooser.component';
import { IconComponent } from '../../shared/designsystem/atoms/icon/icon.component';

@Component({
  selector: 'app-common-navigation-bar',
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    RouterLink,
    LanguageChooserComponent,
    IconButtonComponent,
    DrawerComponent,
    IconComponent,
    NgStyle,
  ],
  templateUrl: './common-navigation-bar.component.html',
})
export class CommonNavigationBarComponent implements OnInit {
  isMobileMenuOpen = false;
  isLanguageMenuOpen = false;
  isDarkModeOn = true;

  routeItems = [
    {
      name: 'Auth',
      route: '/auth',
      isActive: true,
      iconName: 'register',
    },
  ];

  iconSRSupport$: Observable<string> = of();

  constructor(public translate: TranslationService) {}

  ngOnInit(): void {
    this.iconSRSupport$ = this.translate.getIconSRSupport();

    this.isDarkModeOn =
      this.getLocalStorage('fioreTheme') === 'dark' ||
      document.documentElement.classList.contains('dark');

    if (this.isDarkModeOn) document.documentElement.classList.add('dark');
  }

  openLanguageMenu() {
    this.isLanguageMenuOpen = !this.isLanguageMenuOpen;
  }

  openMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleTheme() {
    this.isDarkModeOn = !this.isDarkModeOn;
    document.documentElement.classList.toggle('dark');
    this.setLocalStorage('fioreTheme', this.isDarkModeOn ? 'dark' : 'light');
  }

  setLocalStorage(key: string, value: string) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.error(e);
    }
  }

  getLocalStorage(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.error(e);
    }

    return null;
  }

  closeMenu() {
    this.isLanguageMenuOpen = false;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    if (window.innerWidth < 768) {
      this.isLanguageMenuOpen = false;
    }

    if (window.innerWidth > 768) {
      this.isMobileMenuOpen = false;
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKeydown() {
    this.isLanguageMenuOpen = false;
    this.isMobileMenuOpen = false;
  }
}
