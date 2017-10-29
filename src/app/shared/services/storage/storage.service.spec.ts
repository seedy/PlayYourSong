import { TestBed, inject } from '@angular/core/testing';

import { StorageService } from './storage.service';
import {LocalStorageUtils} from '../../../../testing/localStorage.utils';

describe('StorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService, LocalStorageUtils]
    });
  });

  it('checks service public api', inject([StorageService], (service: StorageService) => {
    expect(service).toBeTruthy();
    expect(service.getKey).toEqual(jasmine.any(Function));
    expect(service.storeKey).toEqual(jasmine.any(Function));
    expect(service.deleteKey).toEqual(jasmine.any(Function));
  }));

  it('checks method getKey', inject([StorageService, LocalStorageUtils], (service: StorageService, lsUtils: LocalStorageUtils) => {
    const foo = 'foo';
    const bar = 'bar';
    const mocks = [foo, bar];
    lsUtils.storeMocks(mocks);
    lsUtils.activateSpies();

    service.getKey(foo);
    expect(localStorage.getItem as jasmine.Spy).toHaveBeenCalledWith(foo);

    (localStorage.getItem as jasmine.Spy).and.callThrough();

    expect(service.getKey(bar)).toEqual(bar);
    expect(localStorage.getItem as jasmine.Spy).toHaveBeenCalledWith(bar);

    expect(service.getKey(foo)).toEqual(foo);
    expect(localStorage.getItem as jasmine.Spy).toHaveBeenCalledWith(foo);

    expect(service.getKey('random')).toBeNull();
    expect(localStorage.getItem as jasmine.Spy).toHaveBeenCalledWith('random');
  }));

  it('checks method storeKey', inject([StorageService, LocalStorageUtils], (service: StorageService, lsUtils: LocalStorageUtils) => {
    const foo = 'foo';
    const bar = 'bar';
    const mocks = [foo, bar];
    lsUtils.activateSpies();

    service.storeKey(foo, foo);
    expect(localStorage.setItem as jasmine.Spy).toHaveBeenCalledWith(foo, foo);

    (localStorage.setItem as jasmine.Spy).and.callThrough();

    service.storeKey(bar, bar);
    expect(localStorage.setItem as jasmine.Spy).toHaveBeenCalledWith(bar, bar);
    expect(lsUtils.isStored(bar)).toBe(true);
  }));

  it('checks method deleteKey', inject([StorageService, LocalStorageUtils], (service: StorageService, lsUtils: LocalStorageUtils) => {
    const foo = 'foo';
    const bar = 'bar';
    const mocks = [foo, bar];
    lsUtils.storeMocks(mocks);
    lsUtils.activateSpies();

    service.deleteKey(foo);
    expect(localStorage.removeItem as jasmine.Spy).toHaveBeenCalledWith(foo);

    (localStorage.removeItem as jasmine.Spy).and.callThrough();

    service.deleteKey(bar);
    expect(localStorage.removeItem as jasmine.Spy).toHaveBeenCalledWith(bar);
    expect(lsUtils.isStored(bar)).toBe(false);

    service.deleteKey(foo);
    expect(localStorage.removeItem as jasmine.Spy).toHaveBeenCalledWith(foo);
    expect(lsUtils.isStored(foo)).toBe(false);
  }));



});
