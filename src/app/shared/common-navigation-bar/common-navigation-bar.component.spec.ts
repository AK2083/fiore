import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonNavigationBarComponent } from './common-navigation-bar.component';

describe('CommonNavigationBarComponent', () => {
  let component: CommonNavigationBarComponent;
  let fixture: ComponentFixture<CommonNavigationBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonNavigationBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonNavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
