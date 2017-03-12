import { TestBed, inject } from '@angular/core/testing';

import { PlaylistControlService } from './playlist-control.service';

describe('PlaylistControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlaylistControlService]
    });
  });

  it('should ...', inject([PlaylistControlService], (service: PlaylistControlService) => {
    expect(service).toBeTruthy();
  }));
});
