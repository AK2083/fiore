import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DrawerComponent } from './drawer.component';
import { By } from '@angular/platform-browser';

describe('DrawerComponent', () => {
  let component: DrawerComponent;
  let fixture: ComponentFixture<DrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit false when onClick is called directly', () => {
    spyOn(component.pressButton, 'emit');
    component.onClick();
    expect(component.pressButton.emit).toHaveBeenCalledWith(false);
  });

  it('should emit false when the close button is clicked', () => {
    spyOn(component.pressButton, 'emit');

    // Button has (click)="onClick()", so we can query for it
    const button = fixture.debugElement.query(By.css('button'));
    expect(button).toBeTruthy();

    button.nativeElement.click();

    expect(component.pressButton.emit).toHaveBeenCalledWith(false);
  });
});
