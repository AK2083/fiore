import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../designsystem/atoms/header/header.component';

import { TranslationService } from '../services/translation.service';
import { LanguageOverviewComponent } from '../../translation/language-overview/language-overview.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-common-navigation-bar',
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    RouterLink,
    HeaderComponent,
    LanguageOverviewComponent
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

  menuTitle$: Observable<string>;

  constructor(public translate: TranslationService) { 
    this.menuTitle$ = this.translate.getTranslationTitle(); 
  }

  openLanguageMenu() {
    this.isLanguageMenuOpen = !this.isLanguageMenuOpen;
  }
}
