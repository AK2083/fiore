import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonNavigationBarComponent } from './shared/common-navigation-bar/common-navigation-bar.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonNavigationBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.translate.addLangs(['de', 'en', 'es']);
    this.translate.setDefaultLang(this.translate.getBrowserLang() || 'en');
  }
}
