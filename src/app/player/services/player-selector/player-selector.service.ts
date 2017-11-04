import {Injectable, Type} from '@angular/core';
import {YoutubePlayerInstanceComponent} from '../../../youtube/components/youtube-player-instance/youtube-player-instance.component';

@Injectable()
export class PlayerSelectorService {

  constructor() { }

  public getComponentFactory(name: string): Type<{}> {
    if (name === 'youtube') {
      return YoutubePlayerInstanceComponent;
    }
  }

}
