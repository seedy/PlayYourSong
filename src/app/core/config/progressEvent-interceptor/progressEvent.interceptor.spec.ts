import {TestBed, inject, async} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HTTP_INTERCEPTORS, HttpClient, HttpEventType, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/reduce';

import {ProgressEventInterceptor} from './progressEvent.interceptor';
import {ProgressHelperService} from '../../services/progressHelper/progress-helper.service';

describe('ProgressEvent Interceptor', () => {
  let progressHelperStub;
  beforeEach(() => {
    progressHelperStub = jasmine.createSpyObj('progressHelper', ['storeEvent']);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ProgressEventInterceptor,
          multi: true
        },
        {
          provide: ProgressHelperService,
          useValue: progressHelperStub
        },
        HttpClient
      ]
    });
  });

  it('intercepts HTTP event, no progress report',
    async(inject([HttpClient, HttpTestingController, ProgressHelperService],
      (http: HttpClient, httpMock: HttpTestingController, progressHelper: ProgressHelperService) => {
        const url = '/mock';
        const data = [{id: 5}];
        const sentObject = jasmine.objectContaining({type: HttpEventType.Sent});
        const responseObject = jasmine.objectContaining({type: HttpEventType.Response});
        http.get(url).subscribe((response) => {
          expect(response).toEqual(data);
        });

        const req = httpMock.expectOne((request) => request.url === url && request.method === 'GET');
        req.flush(data);
        expect(progressHelper.storeEvent as jasmine.Spy).toHaveBeenCalledWith(jasmine.any(HttpResponse));
        expect((progressHelper.storeEvent as jasmine.Spy).calls.count()).toEqual(2);
        expect((progressHelper.storeEvent as jasmine.Spy).calls.argsFor(0)[0]).toEqual(sentObject);
        expect((progressHelper.storeEvent as jasmine.Spy).calls.argsFor(1)[0]).toEqual(responseObject);
      })));

  it('intercepts HTTP event, report progress, mocked standard behaviour',
    async(inject([HttpClient, HttpTestingController, ProgressHelperService],
      (http: HttpClient, httpMock: HttpTestingController, progressHelper: ProgressHelperService) => {
        const url = '/mock';
        const events = [
          {type: 2},
          {type: 3},
          {type: 4}
        ];

        const expectedEvents = [
          {type: 0}
        ].concat(events);

        const sentObject = jasmine.objectContaining({type: HttpEventType.Sent});
        const headerObject = jasmine.objectContaining({type: HttpEventType.ResponseHeader});
        const downloadObject = jasmine.objectContaining({type: HttpEventType.DownloadProgress});
        const responseObject = jasmine.objectContaining({type: HttpEventType.Response});
        http.get(url, {
          reportProgress: true,
          observe: 'events'
        })
        .reduce((acc, event) => {
          acc.push(event);
          return acc;
        }, [])
        .subscribe((arrayEvents) => {
          expect(arrayEvents).toEqual(expectedEvents);
        });

        const req = httpMock.expectOne((request) => request.url === url && request.method === 'GET');

        // mocking standard server behaviour because TestRequest#flush ignores reportProgress config
        events.forEach((event) => req.event(event));

        expect((progressHelper.storeEvent as jasmine.Spy).calls.count()).toEqual(4);
        expect((progressHelper.storeEvent as jasmine.Spy).calls.argsFor(0)[0]).toEqual(sentObject);
        expect((progressHelper.storeEvent as jasmine.Spy).calls.argsFor(1)[0]).toEqual(headerObject);
        expect((progressHelper.storeEvent as jasmine.Spy).calls.argsFor(2)[0]).toEqual(downloadObject);
        expect((progressHelper.storeEvent as jasmine.Spy).calls.argsFor(3)[0]).toEqual(responseObject);
      })));

  it('intercepts each existing HTTP mocked event type, report progress',
    async(inject([HttpClient, HttpTestingController, ProgressHelperService],
      (http: HttpClient, httpMock: HttpTestingController, progressHelper: ProgressHelperService) => {
        const url = '/mock';
        const events = [
          {type: 1},
          {type: 2},
          {type: 3},
          {type: 4}
        ];
        const expectedEvents = [
          {type: 0}
        ].concat(events);
        const sentObject = jasmine.objectContaining({type: HttpEventType.Sent});
        const responseObject = jasmine.objectContaining({type: HttpEventType.Response});
        const downloadObject = jasmine.objectContaining({type: HttpEventType.DownloadProgress});
        const uploadObject = jasmine.objectContaining({type: HttpEventType.UploadProgress});
        const headerObject = jasmine.objectContaining({type: HttpEventType.ResponseHeader});

        http.get(url, {
          reportProgress: true,
          observe: 'events'
        })
        .reduce((acc, event) => {
          acc.push(event);
          return acc;
        }, [])
        .subscribe((arrayEvents) => {
          expect(arrayEvents).toEqual(expectedEvents);
        });

        const req = httpMock.expectOne((request) => request.url === url && request.method === 'GET');

        events.forEach((event) => req.event(event));


        expect((progressHelper.storeEvent as jasmine.Spy).calls.count()).toEqual(5);
        expect((progressHelper.storeEvent as jasmine.Spy).calls.argsFor(0)[0]).toEqual(sentObject);
        expect((progressHelper.storeEvent as jasmine.Spy).calls.argsFor(1)[0]).toEqual(uploadObject);
        expect((progressHelper.storeEvent as jasmine.Spy).calls.argsFor(2)[0]).toEqual(headerObject);
        expect((progressHelper.storeEvent as jasmine.Spy).calls.argsFor(3)[0]).toEqual(downloadObject);
        expect((progressHelper.storeEvent as jasmine.Spy).calls.argsFor(4)[0]).toEqual(responseObject);

      })));


});
