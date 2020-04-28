import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourExpertsComponent } from './tour-experts.component';

describe('TourExpertsComponent', () => {
  let component: TourExpertsComponent;
  let fixture: ComponentFixture<TourExpertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourExpertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourExpertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
