import { NgClass } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isHover = false;
  isEngHover = false;
  isSpainHover = true;
}
