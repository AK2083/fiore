import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextWithSubtextComponent } from './text-with-subtext.component';
import { CommonModule } from '@angular/common';

describe('TextWithSubtextComponent', () => {
  let component: TextWithSubtextComponent;
  let fixture: ComponentFixture<TextWithSubtextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextWithSubtextComponent, CommonModule] // NgIf, UpperCasePipe werden hier importiert
    }).compileComponents();

    fixture = TestBed.createComponent(TextWithSubtextComponent);
    component = fixture.componentInstance;
  });

  it('should have isLoading initially set to true', () => {
    expect(component.isLoading).toBeTrue();
  });

  it('should set isLoading to false when header is provided', () => {
    component.header = 'Test Header';
    component.ngOnChanges(); // Trigger ngOnChanges, da es @Input()-Werte verändert
    expect(component.isLoading).toBeFalse();
  });

  it('should render the subtext when subtext is provided', async () => {
    component.subtext = 'Test Subtext';
    component.isLoading = false;
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('div.hidden.md\\:block.text-sm')?.textContent).toContain('Test Subtext');
  });

  it('should show loading animation when isLoading is true', async () => {
    component.isLoading = true;
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.animate-pulse')).toBeTruthy();
  });

  it('should render the uppercase header abbreviation on mobile view', async () => {
    component.header = 'Test';
    component.isLoading = false;
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('div.block.md\\:hidden')?.textContent).toContain('TE');
  });
});
