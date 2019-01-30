import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DTrackerComponent } from './d-tracker.component';

describe('DTrackerComponent', () => {
  let component: DTrackerComponent;
  let fixture: ComponentFixture<DTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
