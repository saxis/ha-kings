import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesireItemComponent } from './desire-item.component';

describe('DesireItemComponent', () => {
  let component: DesireItemComponent;
  let fixture: ComponentFixture<DesireItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesireItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesireItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
