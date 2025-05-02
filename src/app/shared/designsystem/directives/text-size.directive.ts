import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appTextSize]'
})
export class TextSizeDirective implements OnInit, OnChanges {
  @Input('appTextSize') padding: 'small' | 'medium' | 'large' = 'medium';

  private paddingClasses = {
    small: 'text-lg',
    medium: 'text-xl',
    large: 'text-2xl',
  };

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.applyPaddingClass();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['padding']) {
      this.applyPaddingClass();
    }
  }

  private applyPaddingClass(): void {
    Object.values(this.paddingClasses).forEach((clazz) => {
      this.renderer.removeClass(this.el.nativeElement, clazz);
    });
    this.renderer.addClass(
      this.el.nativeElement,
      this.paddingClasses[this.padding] || this.paddingClasses['medium'],
    );
  }
}
