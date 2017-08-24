import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeResultListComponent } from './youtube-result-list.component';

describe('YoutubeResultListComponent', () => {
  let component: YoutubeResultListComponent;
  let fixture: ComponentFixture<YoutubeResultListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YoutubeResultListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubeResultListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
