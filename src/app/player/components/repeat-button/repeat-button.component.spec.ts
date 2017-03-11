import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeatButtonComponent } from './repeat-button.component';

describe('RepeatButtonComponent', () => {
  let component: RepeatButtonComponent;
  let fixture: ComponentFixture<RepeatButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepeatButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepeatButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
