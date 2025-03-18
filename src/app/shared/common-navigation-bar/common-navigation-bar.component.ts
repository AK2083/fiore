import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FlagComponent } from '../designsystem/icons/flag/flag.component';
import { LangButtonComponent } from '../designsystem/atoms/lang-button/lang-button.component';
import { DeFlagComponent } from '../designsystem/animation/de-flag/de-flag.component';
import { EnFlagComponent } from '../designsystem/animation/en-flag/en-flag.component';
import { EsFlagComponent } from '../designsystem/animation/es-flag/es-flag.component';

@Component({
  selector: 'app-common-navigation-bar',
  imports: [
    NgIf,
    NgFor,
    RouterLink,
    FlagComponent,
    LangButtonComponent,
    DeFlagComponent,
    EnFlagComponent,
    EsFlagComponent
  ],
  templateUrl: './common-navigation-bar.component.html',
  styleUrl: './common-navigation-bar.component.css'
})
export class CommonNavigationBarComponent {
  isMobileMenuOpen = false;
  isLanguageMenuOpen = true;
  isHover = true;

  routeItems = [
    {
      name: "Home",
      route: "/home",
      isActive: true
    },
  ];

  changeLanguage() {
    this.isLanguageMenuOpen = !this.isLanguageMenuOpen;
  }
}
