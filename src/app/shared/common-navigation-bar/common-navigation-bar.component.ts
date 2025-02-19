import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-common-navigation-bar',
  imports: [
    NgIf,
    NgFor
  ],
  templateUrl: './common-navigation-bar.component.html',
  styleUrl: './common-navigation-bar.component.css'
})
export class CommonNavigationBarComponent {
  isMobileMenuOpen = false;

  routeItems = [
    {
      name: "Home",
      isActive: true
    },
  ];
}
