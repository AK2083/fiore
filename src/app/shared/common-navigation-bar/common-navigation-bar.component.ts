import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LangButtonComponent, LanguageModel } from '../designsystem/atoms/lang-button/lang-button.component';
import { HeaderComponent } from '../designsystem/atoms/header/header.component';

import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-common-navigation-bar',
  imports: [
    NgIf,
    NgFor,
    RouterLink,
    HeaderComponent,
    LangButtonComponent,
  ],
  templateUrl: './common-navigation-bar.component.html',
  styleUrl: './common-navigation-bar.component.css'
})
export class CommonNavigationBarComponent implements OnInit {
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

  langItems: LanguageModel[] = [];
  menuTitle = "";

  constructor(public translate: TranslationService) { }

  ngOnInit() {
    this.loadLanguageItems();
  }

  changeLanguageEvent(data: LanguageModel) {
    this.translate.setSelectedLanguage(data.lang);
    this.loadLanguageItems(data.lang); 
  }

  openLanguageMenu() {
    this.isLanguageMenuOpen = !this.isLanguageMenuOpen;
  }

  loadLanguageItems(lng: string = "") {
    if (lng === "") lng = this.translate.getDefaultLanguage();

    this.translate.getLanguageNames().subscribe(({ de, en, es }) => {
      this.langItems = [
        {
          langName: de,
          lang: 'de',
          welcomeText: 'Guten Morgen',
          isActive: lng === 'de'
        },
        {
          langName: en,
          lang: 'en',
          welcomeText: 'Good Morning',
          isActive: lng === 'en'
        },
        {
          langName: es,
          lang: 'es',
          welcomeText: 'Buenos Dias!',
          isActive: lng === 'es'
        }
      ];
    });

    this.translate
      .getTranslationTitle()
      .subscribe((result: string) => this.menuTitle = result);
  }
}
