import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OTrackerComponent } from './o-tracker.component';

describe('OTrackerComponent', () => {
  let component: OTrackerComponent;
  let fixture: ComponentFixture<OTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
