import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-common-navigation-bar',
  imports: [NgFor],
  templateUrl: './common-navigation-bar.component.html',
  styleUrl: './common-navigation-bar.component.css'
})
export class CommonNavigationBarComponent {
  routeItems = [
    {
      name: "Dashboard",
      isActive: true
    },
    {
      name: "Team",
      isActive: false
    }
  ]
}
