import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddjourneysComponent } from './addjourneys.component';

describe('AddjourneysComponent', () => {
  let component: AddjourneysComponent;
  let fixture: ComponentFixture<AddjourneysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddjourneysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddjourneysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
