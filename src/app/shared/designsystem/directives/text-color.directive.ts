import { Directive, ElementRef, HostBinding, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTextColor]',
})
export class TextColorDirective {
  @Input() textColorLight = '';
  @Input() textColorDark = '';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}
  
  @HostBinding('class')
  get getTextColorClasses(): string {
    return `${this.textColorLight} ${this.textColorDark}`;
  }
}
