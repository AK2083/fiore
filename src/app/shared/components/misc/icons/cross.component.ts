import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cross',
  imports: [],
  template: `
    <svg
      [class]="styleClass"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  `,
  styles: ``,
})
export class CrossComponent {
  @Input() styleClass?: string = undefined;
}
