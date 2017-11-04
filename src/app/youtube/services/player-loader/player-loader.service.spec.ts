import {TestBed, inject, async} from '@angular/core/testing';

import { PlayerLoaderService } from './player-loader.service';
import {Observable} from 'rxjs/Observable';
import {YoutubeStub} from '../../../../testing/youtube-stub';

describe('PlayerLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlayerLoaderService,
        YoutubeStub
      ]
    });
  });

  it('checks service public api', inject([PlayerLoaderService], (service: PlayerLoaderService) => {
    expect(service).toBeTruthy();
    expect(service.apiReady$).toEqual(jasmine.any(Observable));
    expect(service.loadApi).toEqual(jasmine.any(Function));
    expect(service.loadPlayer).toEqual(jasmine.any(Function));
  }));

  it('checks method loadApi',
    async(inject([PlayerLoaderService], (service: PlayerLoaderService) => {
      const scriptSrc = 'https://www.youtube.com/iframe_api';
      const scriptType = 'text/javascript';
      expect(service.loadApi()).toEqual(service.apiReady$);
      expect((<any>window).onYouTubeIframeAPIReady).toEqual(jasmine.any(Function));
      const scripts = window.document.body.getElementsByTagName('script');

      // last script is the one just added by loadApi
      expect(scripts[scripts.length - 1].type).toEqual(scriptType);
      expect(scripts[scripts.length - 1].src).toEqual(scriptSrc);
    })));

    it('checks method loadPlayer',
      async(inject([PlayerLoaderService, YoutubeStub], (service: PlayerLoaderService, ytStub: YoutubeStub) => {
        const selector = 'mock';
        const options = {test: true};
        service.loadApi();

        service.loadPlayer(selector, options)
          .subscribe((player) => player);
        (<any>window['YT']) = ytStub;
        (<any>window).onYouTubeIframeAPIReady();

        expect(ytStub.Player as jasmine.Spy).toHaveBeenCalledWith(selector, options);
      })));
});
