import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

export enum Sizes {
  small = 'small',
  normal = 'normal',
  large = 'large',
} 

@Directive({
  selector: '[appSizing]',
})
export class SizingDirective {
  @Input() size: Sizes = Sizes.normal;

  private sizeClassMap: Record<Sizes, string> = {
    [Sizes.small]: 'size-6',
    [Sizes.normal]: 'size-12',
    [Sizes.large]: 'size-18', 
  };

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.applySizeClass();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['size']) {
      this.applySizeClass();
    }
  }

  private applySizeClass(): void {
    Object.values(this.sizeClassMap).forEach((tailwindClass) => {
      this.renderer.removeClass(this.el.nativeElement, tailwindClass);
    });

    const classToApply = this.sizeClassMap[this.size];
    
    if (classToApply) {
      this.renderer.addClass(this.el.nativeElement, classToApply);
    } else {
      this.renderer.addClass(this.el.nativeElement, this.sizeClassMap[Sizes.normal]);
    }
  }
}
