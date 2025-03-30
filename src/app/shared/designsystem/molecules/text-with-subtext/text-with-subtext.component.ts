import { NgIf } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-text-with-subtext',
  imports: [NgIf],
  templateUrl: './text-with-subtext.component.html',
  styles: ``
})
export class TextWithSubtextComponent implements OnChanges {
  @Input() isLoading = true;
  @Input() header: string | null = null;
  @Input() subtext: string | null = null;

  ngOnChanges() {
    this.isLoading = !this.header || !this.subtext;
  }
}
