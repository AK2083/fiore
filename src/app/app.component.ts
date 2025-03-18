import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonNavigationBarComponent } from './shared/common-navigation-bar/common-navigation-bar.component';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonNavigationBarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['de', 'en', 'es']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }
}
