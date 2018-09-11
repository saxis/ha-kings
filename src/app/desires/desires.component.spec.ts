import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesiresComponent } from './desires.component';

describe('DesiresComponent', () => {
  let component: DesiresComponent;
  let fixture: ComponentFixture<DesiresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesiresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesiresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
