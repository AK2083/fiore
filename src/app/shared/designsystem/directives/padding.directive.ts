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
  selector: '[appPadding]',
})
export class PaddingDirective implements OnInit, OnChanges {
  @Input('appPadding') padding: 'small' | 'medium' | 'large' = 'medium';

  private paddingClasses = {
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8',
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
