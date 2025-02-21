import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonNavigationBarComponent } from './shared/common-navigation-bar/common-navigation-bar.component';

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
  title = 'myapp';
}
