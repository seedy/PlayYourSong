import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {
  HttpDownloadProgressEvent, HttpEvent, HttpEventType, HttpHeaderResponse, HttpHeaders,
  HttpProgressEvent, HttpResponse, HttpSentEvent
} from '@angular/common/http';
import {Subject} from 'rxjs/Subject';

import {MaterialModule} from '../../../material/material.module';
import { ProgressEventBarComponent } from './progress-event-bar.component';
import {ProgressHelperService} from '../../services/progressHelper/progress-helper.service';
import {HttpUploadProgressEvent} from '@angular/common/http/src/response';

fdescribe('ProgressEventBarComponent', () => {
  let component: ProgressEventBarComponent;
  let fixture: ComponentFixture<ProgressEventBarComponent>;
  let progressHelperStub;
  const eventBus = new Subject<HttpEvent<any>>();
  const observable = eventBus.asObservable();

  beforeEach(async(() => {
    progressHelperStub = {
      progressEventControl$: observable
    };

    TestBed.configureTestingModule({
      imports: [
        MaterialModule
      ],
      declarations: [
        ProgressEventBarComponent,
      ],
      providers: [
        {provide: ProgressHelperService, useValue: progressHelperStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressEventBarComponent);
    component = fixture.componentInstance;
    spyOn(component, 'ngOnInit').and.callThrough();
    fixture.detectChanges();
  });

  it('checks component state before onInit', () => {
    const fixt = TestBed.createComponent(ProgressEventBarComponent);
    const comp = fixt.componentInstance;
    spyOn(comp, 'ngOnInit');
    fixt.detectChanges();
    expect(comp).toBeTruthy();
    expect(comp.ngOnInit).toHaveBeenCalled();
    expect(comp.progressMode).toBeUndefined();
    expect(comp.progressStatus).toBeUndefined();
    expect(comp.progressTotal).toBeUndefined();
  })

  it('checks component public api, construction and lifecycle', () => {
    expect(component).toBeTruthy();
    expect(component.ngOnInit).toHaveBeenCalled();
    expect(component.progressMode).toEqual('');
    expect(component.progressStatus).toBeUndefined();
    expect(component.progressTotal).toBeUndefined();
  });

  it('checks component state after event received, type Sent',
    async(() => {
      const event: HttpSentEvent = {type: HttpEventType.Sent};
      eventBus.next(event);

      expect(component.progressMode).toEqual('determinate');
      expect(component.progressStatus).toEqual(0);
      expect(component.progressTotal).toBeUndefined();
  }));

  it('checks component state after event received, type ResponseHeader',
    async(() => {
      const contentLength = 100;
      const contentLengthHeader = new HttpHeaders({'Content-Length': contentLength.toString()});
      const event: HttpHeaderResponse = new HttpHeaderResponse({headers: contentLengthHeader});
      eventBus.next(event);

      expect(component.progressMode).toEqual('determinate');
      expect(component.progressStatus).toBeUndefined();
      expect(component.progressTotal).toEqual(contentLength * 10);
    }));

  it('checks component state after event received, type Upload/Download Progress, no total',
    async(() => {
      const event: HttpDownloadProgressEvent = {type: HttpEventType.DownloadProgress, loaded: 10};
      eventBus.next(event);

      expect(component.progressMode).toEqual('determinate');
      expect(component.progressTotal).toBeUndefined();
      expect(component.progressStatus).toEqual(0);
    }));

  it('checks component state after event received, type Upload/Download Progress, total',
    async(() => {
      const event: HttpUploadProgressEvent = {type: HttpEventType.UploadProgress, loaded: 10, total: 100};
      eventBus.next(event);

      expect(component.progressMode).toEqual('determinate');
      expect(component.progressTotal).toBeUndefined();
      expect(component.progressStatus).toEqual(10);
    }));

  it('checks component state after event received, type Response',
    fakeAsync(() => {
      const event: HttpResponse<any> = new HttpResponse();
      // force data value for specific test purpose
      component.progressTotal = 100;
      eventBus.next(event);

      expect(component.progressMode).toEqual('determinate');
      expect(component.progressTotal).toEqual(100);
      expect(component.progressStatus).toEqual(component.progressTotal);

      tick(500);

      expect(component.progressMode).toEqual('');
    }));


});
