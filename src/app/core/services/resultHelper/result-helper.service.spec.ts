import { TestBed, inject } from '@angular/core/testing';

import { ResultHelperService } from './result-helper.service';

describe('ResultHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResultHelperService]
    });
  });

  it('should ...', inject([ResultHelperService], (service: ResultHelperService) => {
    expect(service).toBeTruthy();
  }));
});
