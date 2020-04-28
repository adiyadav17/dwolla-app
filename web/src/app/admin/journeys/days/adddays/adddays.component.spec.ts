import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddaysComponent } from './adddays.component';

describe('AdddaysComponent', () => {
  let component: AdddaysComponent;
  let fixture: ComponentFixture<AdddaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdddaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
