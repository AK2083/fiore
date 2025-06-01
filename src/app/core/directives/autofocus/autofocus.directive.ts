import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements OnInit {
  @Input() isAutoFocusActive = false;

  constructor(private host: ElementRef) {}

  ngOnInit() {
    if (this.isAutoFocusActive)
      this.host.nativeElement.focus();
  }

}
