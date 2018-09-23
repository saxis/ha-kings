import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObligationDetailComponent } from './obligation-detail.component';

describe('ObligationDetailComponent', () => {
  let component: ObligationDetailComponent;
  let fixture: ComponentFixture<ObligationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObligationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObligationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
