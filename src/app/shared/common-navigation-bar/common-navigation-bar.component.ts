import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LangButtonComponent, LanguageModel } from '../designsystem/atoms/lang-button/lang-button.component';
import { HeaderComponent } from '../designsystem/atoms/header/header.component';

import { TranslationService } from '../services/translation.service';
import { StatusButtonComponent } from '../designsystem/atoms/status-button/status-button.component';

enum Language {
  DE = 'de',
  EN = 'en',
  ES = 'es'
}

@Component({
  selector: 'app-common-navigation-bar',
  imports: [
    NgIf,
    NgFor,
    RouterLink,
    HeaderComponent,
    LangButtonComponent,
    StatusButtonComponent
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

  language = Language;
  languageKeys = Object.keys(this.language);

  constructor(public translate: TranslationService) { }

  ngOnInit() {
    this.loadLanguageItems();
  }

  changeLanguageEvent(langType: string) {
    this.translate.setSelectedLanguage(langType);
    this.loadLanguageItems(langType);
  }

  openLanguageMenu() {
    this.isLanguageMenuOpen = !this.isLanguageMenuOpen; 
  }

  loadLanguageItems(lng: string = "") {
    if (lng === "") 
      lng = this.translate.getDefaultLanguage();

    this.translate.getLanguageNames().subscribe(({ de, en, es }) => {
      this.langItems = [
        {
          langName: de.langName,
          ariaLabel: de.ariaLabel,
          lang: this.language.DE,
          welcomeText: 'Guten Morgen',
          isActive: lng === this.language.DE
        },
        {
          langName: en.langName,
          ariaLabel: en.ariaLabel,
          lang: this.language.EN,
          welcomeText: 'Good Morning',
          isActive: lng === this.language.EN
        },
        {
          langName: es.langName,
          ariaLabel: es.ariaLabel,
          lang: this.language.ES,
          welcomeText: 'Buenos Dias!',
          isActive: lng === this.language.ES
        }
      ];
    });

    this.translate
      .getTranslationTitle()
      .subscribe((result: string) => this.menuTitle = result);
  }
}
