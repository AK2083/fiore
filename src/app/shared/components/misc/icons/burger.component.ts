import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-burger',
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
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  `,
  styles: ``,
})
export class BurgerComponent {
  @Input() styleClass?: string = undefined;
}
