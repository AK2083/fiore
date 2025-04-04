import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TranslationService } from '../services/translation.service';
import { Observable } from 'rxjs';
import { DrawerComponent } from '../designsystem/molecules/drawer/drawer.component';
import { IconButtonComponent } from '../designsystem/atoms/icon-button/icon-button.component';
import { LanguageChooserComponent } from '../../translation/language-chooser/language-chooser.component';
import { GlobeComponent } from '../designsystem/icons/globe/globe.component';
import { BurgerComponent } from '../designsystem/icons/burger/burger.component';

@Component({
  selector: 'app-common-navigation-bar',
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    RouterLink,
    LanguageChooserComponent,
    IconButtonComponent,
    GlobeComponent,
    BurgerComponent,
    DrawerComponent
  ],
  templateUrl: './common-navigation-bar.component.html',
})
export class CommonNavigationBarComponent {
  isMobileMenuOpen = false;
  isLanguageMenuOpen = false;

  routeItems = [
    {
      name: "Home",
      route: "/home",
      isActive: true
    },
  ];

  iconSRSupport$: Observable<string>;

  constructor(public translate: TranslationService) {
    this.iconSRSupport$ = this.translate.getIconSRSupport();
  }

  openLanguageMenu() {
    this.isLanguageMenuOpen = !this.isLanguageMenuOpen;
  }

  openMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMenu() {
    this.isLanguageMenuOpen = false;
  }

  @HostListener('window:resize', ['$event'])
  onDocumentClick() {
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
  }
}
