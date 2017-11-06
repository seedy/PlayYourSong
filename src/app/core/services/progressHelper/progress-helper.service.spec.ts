import {TestBed, inject, async} from '@angular/core/testing';

import { ProgressHelperService } from './progress-helper.service';
import {Observable} from 'rxjs/Observable';
import {HttpResponse} from '@angular/common/http';

fdescribe('ProgressHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProgressHelperService]
    });
  });

  it('checks service public api', inject([ProgressHelperService], (service: ProgressHelperService) => {
    expect(service).toBeTruthy();
    expect(service.progressEventControl$).toEqual(jasmine.any(Observable));
    expect(service.storeEvent).toEqual(jasmine.any(Function));
  }));

  it('checks method storeEvent',
    async(inject([ProgressHelperService], (service: ProgressHelperService) => {
    const event = new HttpResponse({body: {id: 'mock'}});


    service.progressEventControl$.subscribe((progressEvent) => {
      expect(progressEvent).toEqual(event);
    });

    service.storeEvent(event);

  })));

});
