import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonNavigationBarComponent } from './core/components/common-navigation-bar/common-navigation-bar.component';

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
