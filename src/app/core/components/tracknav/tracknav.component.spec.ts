import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EventEmitter} from '@angular/core';
import {By} from '@angular/platform-browser';

import { TracknavComponent } from './tracknav.component';
import {ComponentsStub} from '../../../../testing/components-stub';
import {MaterialModule} from '../../../material/material.module';

fdescribe('TracknavComponent', () => {
  let component: TracknavComponent;
  let fixture: ComponentFixture<TracknavComponent>;
  let playerMenuStub, playlistStub, wrapper;
  const isOpen = true;

  beforeEach(async(() => {
    playerMenuStub = ComponentsStub.mockComponent({
      selector: 'pys-player-menu',
      inputs: ['fullMode']
    });
    playlistStub = ComponentsStub.mockComponent({
      selector: 'pys-playlist'
    });
    wrapper = ComponentsStub.mockComponent({
      selector: 'wrapper',
      template: `<pys-tracknav [open]="false"><h1 class="special-content">Content</h1></pys-tracknav>`
    });
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        BrowserAnimationsModule
      ],
      declarations: [
        TracknavComponent,
        playerMenuStub,
        playlistStub,
        wrapper
      ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TracknavComponent);
    component = fixture.componentInstance;
    component.open = isOpen;
    fixture.detectChanges();
  });

  it('checks component public api, construction and lifecycle', () => {
    expect(component).toBeTruthy();
    expect(component.open).toEqual(isOpen);
    expect(component.closed).toEqual(jasmine.any(EventEmitter));
    expect(component.onTracknavClosed).toEqual(jasmine.any(Function));
    expect(component.toggle).toEqual(jasmine.any(Function));
  });

  it('checks method onTracknavClosed', () => {
    spyOn(component.closed, 'emit');
    component.onTracknavClosed();
    expect(component.closed.emit).toHaveBeenCalled();
  });

  it('checks method toggle', () => {
    expect(component.open).toEqual(isOpen);
    component.toggle();
    expect(component.open).toEqual(!isOpen);
  });

  it('checks bindings with component pys-player-menu', () => {
    const playerMenuEl = fixture.debugElement.query(By.css('pys-player-menu'));
    expect(playerMenuEl).not.toBeNull();
    expect(playerMenuEl.componentInstance).toBeDefined();
    expect(playerMenuEl.componentInstance.fullMode).toEqual(component.open);

    component.open = !component.open;
    fixture.detectChanges();
    expect(playerMenuEl.componentInstance.fullMode).toEqual(component.open);
  });

  it('checks bindings with component pys-playlist', () => {
    const playlistEl = fixture.debugElement.query(By.css('pys-playlist'));
    expect(playlistEl).not.toBeNull();
  });

  it('checks ng-content binding with custom wrapper', () => {
    const fixt = TestBed.createComponent(wrapper);
    const testHost = fixt.componentInstance;
    fixt.detectChanges();
    const content = fixt.debugElement.query(By.css('pys-tracknav h1.special-content'));
    expect(testHost).toBeTruthy();
    expect(content).not.toBeNull();
  });

});
