import { NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-icon',
  imports: [NgClass],
  templateUrl: './icon.component.html',
  styles: ``
})
export class IconComponent implements OnChanges {
  @Input() name = "";
  @Input() size = 6;

  public iconPath: SafeUrl = "";

  constructor(
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer,
    ) {
  }

  public ngOnChanges(): void {
    if (!this.name) {
      this.iconPath = '';
      return;
    }
    
    this.httpClient
      .get(`assets/${this.name}.svg`, { responseType: 'text' })
      .subscribe(value => {
        this.iconPath = this.sanitizer.bypassSecurityTrustHtml(value);
      });
  }

  get iconSize(): string {
    return `size-${this.size}`;
  }
}
