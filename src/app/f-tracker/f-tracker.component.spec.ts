import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FTrackerComponent } from './f-tracker.component';

describe('FTrackerComponent', () => {
  let component: FTrackerComponent;
  let fixture: ComponentFixture<FTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
