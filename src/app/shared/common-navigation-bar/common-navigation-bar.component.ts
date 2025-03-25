import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../designsystem/atoms/header/header.component';

import { TranslationService } from '../services/translation.service';
import { LanguageOverviewComponent } from '../../translation/language-overview/language-overview.component';
import { Observable } from 'rxjs';
import { SimplePanelComponent } from '../designsystem/atoms/simple-panel/simple-panel.component';
import { GlobeComponent } from '../designsystem/icons/globe/globe.component';
import { DrawerComponent } from '../designsystem/molecules/drawer/drawer.component';

@Component({
  selector: 'app-common-navigation-bar',
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    RouterLink,
    HeaderComponent,
    LanguageOverviewComponent,
    SimplePanelComponent,
    GlobeComponent,
    DrawerComponent
  ],
  templateUrl: './common-navigation-bar.component.html',
  styleUrl: './common-navigation-bar.component.css'
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

  menuTitle$: Observable<string>;

  constructor(public translate: TranslationService) { 
    this.menuTitle$ = this.translate.getTranslationTitle(); 
  }

  openLanguageMenu(openMenu: boolean) {
    this.isLanguageMenuOpen = openMenu;
  }
}
