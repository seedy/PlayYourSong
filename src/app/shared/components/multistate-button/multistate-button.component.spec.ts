import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultistateButtonComponent } from './multistate-button.component';

describe('MultistateButtonComponent', () => {
  let component: MultistateButtonComponent;
  let fixture: ComponentFixture<MultistateButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultistateButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultistateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
