import { TestBed, inject } from '@angular/core/testing';

import { PlayerSelectorService } from './player-selector.service';

describe('PlayerSelectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerSelectorService]
    });
  });

  it('should be created', inject([PlayerSelectorService], (service: PlayerSelectorService) => {
    expect(service).toBeTruthy();
  }));
});
