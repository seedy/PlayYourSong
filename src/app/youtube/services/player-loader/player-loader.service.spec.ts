import { TestBed, inject } from '@angular/core/testing';

import { PlayerLoaderService } from './player-loader.service';

describe('PlayerLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerLoaderService]
    });
  });

  it('should be created', inject([PlayerLoaderService], (service: PlayerLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
