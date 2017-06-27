import { TestBed, inject } from '@angular/core/testing';

import { SearchService } from './youtubeSearch.service';

describe('SearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchService]
    });
  });

  it('should ...', inject([SearchService], (service: SearchService) => {
    expect(service).toBeTruthy();
  }));
});
