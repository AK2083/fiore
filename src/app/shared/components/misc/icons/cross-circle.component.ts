import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cross-circle',
  imports: [],
  template: `
    <svg
      [class]="styleClass"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fill-rule="evenodd"
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"
        clip-rule="evenodd"
      />
    </svg>
  `,
  styles: ``,
})
export class CrossCircleComponent {
  @Input() styleClass?: string = undefined;
}
