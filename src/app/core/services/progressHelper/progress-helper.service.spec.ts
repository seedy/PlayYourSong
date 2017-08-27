import { TestBed, inject } from '@angular/core/testing';

import { ProgressHelperService } from './progress-helper.service';

describe('ProgressHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProgressHelperService]
    });
  });

  it('should be created', inject([ProgressHelperService], (service: ProgressHelperService) => {
    expect(service).toBeTruthy();
  }));
});
