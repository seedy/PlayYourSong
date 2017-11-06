import {TestBed, inject, async} from '@angular/core/testing';

import { SearchHelperService } from './searchHelper.service';
import {ResultHelperService} from '../resultHelper/result-helper.service';
import {Searchable} from '../../../shared/classes/searchable';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

fdescribe('SearchHelperService', () => {
  let resultHelperStub;

  class MockClass {
    constructor() {}
  }

  beforeEach(() => {
    resultHelperStub = jasmine.createSpyObj('resultHelper', ['storeResult']);
    TestBed.configureTestingModule({
      providers: [
        SearchHelperService,
        {provide: ResultHelperService, useValue: resultHelperStub}
      ]
    });
  });

  it('checks service public api', inject([SearchHelperService], (service: SearchHelperService) => {
    expect(service).toBeTruthy();
    expect(service.register).toEqual(jasmine.any(Function));
    expect(service.query).toEqual(jasmine.any(Function));
    expect(service.getServices).toEqual(jasmine.any(Function));
  }));

  it('checks method register',
    inject([SearchHelperService], (service: SearchHelperService) => {
      const name = 'serviceMock';
      const instance = new MockClass();
      const fn = jasmine.createSpy('query');
      const expectedServices = [new Searchable(name, instance.constructor.name, instance, fn, false)];

      service.register(name, instance, fn);

      expect(service.getServices()).toEqual(expectedServices);
      expect(fn).not.toHaveBeenCalled();
    }));

  it('checks method query, no service',
    async(inject([SearchHelperService, ResultHelperService], (service: SearchHelperService, resultHelper: ResultHelperService) => {
      const text = 'mock';
      service.query(text);
    })));

  it('checks method query, no active service',
    async(inject([SearchHelperService, ResultHelperService], (service: SearchHelperService, resultHelper: ResultHelperService) => {
      const text = 'mock';
      const name = 'serviceMock';
      const instance = new MockClass();
      const fn = jasmine.createSpy('query');

      service.register(name, instance, fn);

      service.query(text);

      expect(fn).not.toHaveBeenCalled();
      expect(resultHelper.storeResult as jasmine.Spy).not.toHaveBeenCalled();

    })));

  it('checks method query, active service',
    async(inject([SearchHelperService, ResultHelperService], (service: SearchHelperService, resultHelper: ResultHelperService) => {
      const text = 'mock';
      const name = 'serviceMock';
      const otherName = 'testService';
      const instance = new MockClass();
      const data = [{id: 58}];
      const fn = jasmine.createSpy('query').and.returnValue(Observable.of(data));
      const activeIndex = 0;

      service.register(name, instance, fn);
      service.register(otherName, instance, fn);

      service.getServices()[activeIndex].active = true;

      service.query(text);

      expect(fn).toHaveBeenCalled();
      expect(fn.calls.count()).toEqual(1);
      expect(fn.calls.argsFor(0)[0]).toEqual(text);
      expect(resultHelper.storeResult as jasmine.Spy).toHaveBeenCalledWith(instance.constructor.name, data);

    })));

  it('checks method getServices',
    inject([SearchHelperService], (service: SearchHelperService) => {
      expect(service.getServices()).toEqual([]);
    }));

  it('checks method getServices, service registered',
    inject([SearchHelperService], (service: SearchHelperService) => {
      const name = 'serviceMock';
      const instance = new MockClass();
      const fn = jasmine.createSpy('query');
      const expectedServices = [new Searchable(name, instance.constructor.name, instance, fn, false)];

      service.register(name, instance, fn);

      expect(service.getServices()).toEqual(expectedServices);
      expect(fn).not.toHaveBeenCalled();
    }));



});
