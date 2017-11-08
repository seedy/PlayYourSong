import {TestBed, inject, async} from '@angular/core/testing';

import {HttpClient, HttpResponse} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { YoutubeSearchService } from './youtubeSearch.service';
import {YOUTUBE_CONFIG, YoutubeConfig} from '../../config/youtubeConfig';
import {SearchHelperService} from '../../../core/services/searchHelper/searchHelper.service';
import {ErrorMessageService} from '../../../shared/services/error-message/error-message.service';

describe('YoutubeSearchService', () => {
  let youtubeConfigStub, searchHelperStub, errorMessageStub;
  const msgServiceError = 'fixError';

  beforeEach(() => {
    youtubeConfigStub = {
      apiEndpoint: 'http://localhost',
      apiKey: 'mock'
    };
    searchHelperStub = jasmine.createSpyObj('searchHelper', ['register']);
    errorMessageStub = jasmine.createSpyObj('errorMessage', ['handleError']);
    (errorMessageStub.handleError as jasmine.Spy).and.returnValue(Observable.of(msgServiceError));

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        YoutubeSearchService,
        {provide: SearchHelperService, useValue: searchHelperStub},
        {provide: ErrorMessageService, useValue: errorMessageStub},
        {provide: YOUTUBE_CONFIG, useValue: youtubeConfigStub},
        HttpClient
      ]
    });
  });

  it('checks service public api and constructor',
    inject([YoutubeSearchService, YOUTUBE_CONFIG], (service: YoutubeSearchService, config: YoutubeConfig) => {
    expect(service).toBeTruthy();
    const endpoint = config.apiEndpoint + '/search?part=snippet&type=video&key=' + config.apiKey + '&q=';
    expect(service.endpoint).toEqual(endpoint);
    expect(service.activate).toEqual(jasmine.any(Function));
    expect(service.queryVideo).toEqual(jasmine.any(Function));
  }));

  it('checks method activate',
    inject([YoutubeSearchService, SearchHelperService], (service: YoutubeSearchService, searchHelper: SearchHelperService) => {
      const name = 'Youtube';
      service.activate();
      expect(searchHelper.register as jasmine.Spy).toHaveBeenCalledWith(name, service, service.queryVideo);
    }));

  it('checks method queryVideo, no page token, success',
    async(inject([YoutubeSearchService, ErrorMessageService, HttpTestingController],
      (service: YoutubeSearchService, errorMsg: ErrorMessageService, httpMock: HttpTestingController) => {
        const queryString = 'video rigolo';
        const maxResults = 50;
        const pageToken = null;
        const url = service.endpoint + queryString.replace(/\s/, '+') + '&maxResults=' + maxResults;
        const params = {
          reportProgress: true,
          observe: 'events'
        };
        const results = [{id: 1}, {id: 18}];
        const options = {results: results};

        service.queryVideo(queryString, maxResults, pageToken)
          .subscribe((result) => {
            expect(result.query).toEqual(queryString);
            expect(result.results).toEqual(results);
          });

        const req = httpMock.expectOne((request) => {
          return request.url === url && request.method === 'GET';
        });
        expect(req.request.reportProgress).toEqual(params.reportProgress);

        req.flush(options);


        httpMock.verify();

      })));

  it('checks method queryVideo, page token, success',
    async(inject([YoutubeSearchService, ErrorMessageService, HttpTestingController],
      (service: YoutubeSearchService, errorMsg: ErrorMessageService, httpMock: HttpTestingController) => {
        const queryString = 'video rigolo';
        const maxResults = 50;
        const pageToken = 'pagetokenismocked';
        const url = service.endpoint + queryString.replace(/\s/, '+') + '&maxResults=' + maxResults;
        const expectedUrl = url + '&pageToken=' + pageToken;
        const params = {
          reportProgress: true,
          observe: 'events'
        };
        const results = [{id: 2545}, {id: 6}];
        const options = {results: results};

        service.queryVideo(queryString, maxResults, pageToken)
          .subscribe((result) => {
            expect(result.query).toEqual(queryString);
            expect(result.results).toEqual(results);
          });

        const req = httpMock.expectOne((request) => request.url === expectedUrl && request.method === 'GET');
        expect(req.request.reportProgress).toEqual(params.reportProgress);

        req.flush(options);


        httpMock.verify();
      })));

  it('checks method queryVideo, page token, stream event',
    async(inject([YoutubeSearchService, ErrorMessageService, HttpTestingController],
      (service: YoutubeSearchService, errorMsg: ErrorMessageService, httpMock: HttpTestingController) => {
        const queryString = 'video rigolo';
        const maxResults = 50;
        const pageToken = 'pagetokenismocked';
        const url = service.endpoint + queryString.replace(/\s/, '+') + '&maxResults=' + maxResults;
        const expectedUrl = url + '&pageToken=' + pageToken;
        const params = {
          reportProgress: true,
          observe: 'events'
        };
        const event = {type: 0};
        const httpResponse = new HttpResponse({body: {}});

        service.queryVideo(queryString, maxResults, pageToken)
          .subscribe((result) => {
            expect(result).toEqual({query: queryString});
          });

        const req = httpMock.expectOne((request) => {
          return request.url === expectedUrl && request.method === 'GET';
        });
        expect(req.request.reportProgress).toEqual(params.reportProgress);

        // first event is not instance of HttpResponse, therefore it is skipped by method
        req.event(event);
        req.event(httpResponse);


        httpMock.verify();
      })));




  it('checks method queryVideo, page token, server error',
    async(inject([YoutubeSearchService, ErrorMessageService, HttpTestingController],
      (service: YoutubeSearchService, errorMsg: ErrorMessageService, httpMock: HttpTestingController) => {
        const queryString = 'video rigolo';
        const maxResults = 50;
        const pageToken = 'pagetokenismocked';
        const url = service.endpoint + queryString.replace(/\s/, '+') + '&maxResults=' + maxResults;
        const expectedUrl = url + '&pageToken=' + pageToken;
        const params = {
          reportProgress: true,
          observe: 'events'
        };
        const error = new ErrorEvent('mock error');
        const errorInfo = {
          status: 500,
          statusText: 'mock error'
        };

        service.queryVideo(queryString, maxResults, pageToken)
          .subscribe((result) => {
            expect(result).toEqual(msgServiceError);
          });

        const req = httpMock.expectOne((request) => {
          return request.url === expectedUrl && request.method === 'GET';
        });
        expect(req.request.reportProgress).toEqual(params.reportProgress);


        req.error(error, errorInfo);

        expect(errorMsg.handleError).toHaveBeenCalled();
        expect((errorMsg.handleError as jasmine.Spy).calls.argsFor(0)[0]).toEqual(jasmine.objectContaining(errorInfo));

      })));


});
