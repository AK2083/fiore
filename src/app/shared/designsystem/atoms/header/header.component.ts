import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [NgIf],
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {
  @Input() title: string | null = null;
  @Input() isLoading = true;
}
