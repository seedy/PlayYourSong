import { TestBed, inject } from '@angular/core/testing';

import { SearchHelperService } from './searchHelper.service';

describe('SearchHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchHelperService]
    });
  });

  it('should ...', inject([SearchHelperService], (service: SearchHelperService) => {
    expect(service).toBeTruthy();
  }));
});
