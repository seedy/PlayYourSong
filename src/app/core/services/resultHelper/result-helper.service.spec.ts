import {TestBed, inject, async} from '@angular/core/testing';

import { ResultHelperService } from './result-helper.service';
import {Observable} from 'rxjs/Observable';

describe('ResultHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResultHelperService]
    });
  });

  it('checks service public api', inject([ResultHelperService], (service: ResultHelperService) => {
    expect(service).toBeTruthy();
    expect(service.resultControl$).toEqual(jasmine.any(Observable));
    expect(service.storeResult).toEqual(jasmine.any(Function));
  }));

  it('checks method storeResult',
    async(inject([ResultHelperService], (service: ResultHelperService) => {
      const id = 'dfgt';
      const result = [{id: 8}, {id: 52}];

      service.resultControl$.subscribe((resObject) => {
        expect(resObject.id).toEqual(id);
        expect(resObject.result).toEqual(result);
      });

      service.storeResult(id, result);
    })));
});
