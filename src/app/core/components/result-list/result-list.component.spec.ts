import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {Subject} from 'rxjs/Subject';

import { ResultListComponent } from './result-list.component';
import {MaterialModule} from '../../../material/material.module';
import {ComponentsStub} from '../../../../testing/components-stub';
import {ResultHelperService} from '../../services/resultHelper/result-helper.service';
import {PlaylistControlService} from '../../../shared/services/playlist-control/playlist-control.service';
import {Tab} from '../../../shared/classes/tab';
import {ClassesStub} from '../../../../testing/classes-stub';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('ResultListComponent', () => {
  let component: ResultListComponent;
  let fixture: ComponentFixture<ResultListComponent>;
  let youtubeResultListStub, resultHelperStub, playlistControlStub;
  const eventBus = new Subject<Tab>();
  const observable = eventBus.asObservable();

  beforeEach(async(() => {
    youtubeResultListStub = ComponentsStub.mockComponent({
      selector: 'pys-youtube-result-list',
      inputs: ['result'],
      outputs: ['resultAdded']
    });
    resultHelperStub = {
      resultControl$: observable
    };
    playlistControlStub = jasmine.createSpyObj('playlistControl', ['queueInControl']);

    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        BrowserAnimationsModule
      ],
      declarations: [
        ResultListComponent,
        youtubeResultListStub
      ],
      providers: [
        ClassesStub,
        {provide: ResultHelperService, useValue: resultHelperStub},
        {provide: PlaylistControlService, useValue: playlistControlStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('checks component public api, construction',
    inject([ClassesStub], (classesStub: ClassesStub) => {
      const tab = classesStub.newTab('mock');
      expect(component).toBeTruthy();
      expect(component.tabs).toEqual([]);
      expect(component.close).toEqual(jasmine.any(Function));
      expect(component.onResultAdded).toEqual(jasmine.any(Function));
      eventBus.next(tab);
      expect(component.tabs.length).toEqual(1);
      expect(component.tabs[0]).toEqual(jasmine.objectContaining(tab));
  }));

  it('checks method close, no tab or negative index', () => {
    const currentLength = component.tabs.length;
    component.close(-1);
    expect(component.tabs.length).toEqual(currentLength);
    component.close(0);
    expect(component.tabs.length).toEqual(currentLength);
  });

  it('checks method close, tabs',
    inject([ClassesStub], (classesStub: ClassesStub) => {
      const tab = classesStub.newTab('mock');
      component.tabs.push(tab);
      component.close(0);
      expect(component.tabs.length).toEqual(0);
  }));

  it('checks method onResultAdded',
    inject([ClassesStub, PlaylistControlService], (classesStub: ClassesStub, playlistControl: PlaylistControlService) => {
      const result = classesStub.newTrack('mock');
      component.onResultAdded(result);
      expect(playlistControl.queueInControl as jasmine.Spy).toHaveBeenCalledWith(result);
  }));

  it('checks bindings with component pys-youtube-result-list, no component if no known tab',
    inject([ClassesStub], (classesStub: ClassesStub) => {
      let tabEl = fixture.debugElement.query(By.css('pys-youtube-result-list'));
      expect(tabEl).toBeNull();
      const tab = classesStub.newTab('mock', 'othername');
      component.tabs.push(tab);
      fixture.detectChanges();
      tabEl = fixture.debugElement.query(By.css('pys-youtube-result-list'));
      expect(tabEl).toBeNull();
  }));

  it('checks bindings with component pys-youtube-result-list',
    inject([ClassesStub], (classesStub: ClassesStub) => {
      const tab = classesStub.newTab('mock', 'youtube');
      const track = classesStub.newTrack('track');
      component.tabs.push(tab);
      fixture.detectChanges();
      const tabEl = fixture.debugElement.query(By.css('pys-youtube-result-list'));
      expect(tabEl).not.toBeNull();
      expect(tabEl.componentInstance).toBeDefined();

      expect(tabEl.componentInstance.result).toEqual(tab.result);
      tab.result = {id: 25};
      fixture.detectChanges();
      expect(tabEl.componentInstance.result).toEqual(tab.result);

      spyOn(component, 'onResultAdded');

      tabEl.componentInstance.resultAdded.emit(track);
      expect(component.onResultAdded as jasmine.Spy).toHaveBeenCalledWith(track);
    }));

});
