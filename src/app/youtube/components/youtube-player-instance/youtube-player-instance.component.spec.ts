import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubePlayerInstanceComponent } from './youtube-player-instance.component';

describe('YoutubePlayerInstanceComponent', () => {
  let component: YoutubePlayerInstanceComponent;
  let fixture: ComponentFixture<YoutubePlayerInstanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YoutubePlayerInstanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubePlayerInstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
