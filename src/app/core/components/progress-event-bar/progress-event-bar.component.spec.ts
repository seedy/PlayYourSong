import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressEventBarComponent } from './progress-event-bar.component';

describe('ProgressEventBarComponent', () => {
  let component: ProgressEventBarComponent;
  let fixture: ComponentFixture<ProgressEventBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressEventBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressEventBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
