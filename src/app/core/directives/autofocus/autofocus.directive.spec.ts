import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutofocusDirective } from './autofocus.directive';
import { By } from '@angular/platform-browser';

@Component({
  imports: [AutofocusDirective],
  template: `<input
    type="text"
    appAutofocus
    [isAutoFocusActive]="autoFocusActive"
  />`,
})
class TestHostComponent {
  autoFocusActive = false;
}

describe('AutofocusDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AutofocusDirective, TestHostComponent],
    });

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges(); // ngOnInit runs here
    inputEl = fixture.debugElement.query(By.css('input'));
  });

  it('should not focus the input if isAutoFocusActive is false', () => {
    const activeElem = document.activeElement;
    expect(inputEl.nativeElement).not.toBe(activeElem);
  });

  it('should focus the input if isAutoFocusActive is true', () => {
    fixture.componentInstance.autoFocusActive = true;
    fixture.detectChanges(); // triggers ngOnInit again via lifecycle hook
    const input = inputEl.nativeElement;

    // Simulate OnInit manually, since Angular doesn't rerun ngOnInit on change detection
    input.focus = jasmine.createSpy('focus');
    fixture.debugElement.children[0].injector
      .get(AutofocusDirective)
      .ngOnInit();

    expect(input.focus).toHaveBeenCalled();
  });
});
