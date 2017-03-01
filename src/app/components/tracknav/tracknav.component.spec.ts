import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TracknavComponent } from './tracknav.component';

describe('TracknavComponent', () => {
  let component: TracknavComponent;
  let fixture: ComponentFixture<TracknavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TracknavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TracknavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
