import { TestBed, inject } from '@angular/core/testing';

import { PlayerSelectorService } from './player-selector.service';
import {YoutubePlayerInstanceComponent} from '../../../youtube/components/youtube-player-instance/youtube-player-instance.component';

describe('PlayerSelectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerSelectorService]
    });
  });

  it('checks service public api', inject([PlayerSelectorService], (service: PlayerSelectorService) => {
    expect(service).toBeTruthy();
    expect(service.getComponentFactory).toEqual(jasmine.any(Function));
  }));

  it('checks method getComponentFactory',
    inject([PlayerSelectorService], (service: PlayerSelectorService) => {
      const serviceObj = {youtube: YoutubePlayerInstanceComponent};
      const keys = ['youtube'];

      keys.forEach((key) => {
        if (serviceObj[key]) {
          expect(service.getComponentFactory(key)).toEqual(serviceObj[key]);
        }
      });
    }));

});
