import {Injectable, Type} from '@angular/core';
import {YoutubePlayerInstanceComponent} from '../../components/youtube-player-instance/youtube-player-instance.component';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PlayerLoaderService {

  private api = 'https://www.youtube.com/iframe_api';
  apiReady = new Subject<any>();

  constructor() { }

  public loadApi(): void {
    (<any>window).onYoutubeIframeAPIReady = () => {
      this.onApiReady();
    };
    const doc = window.document;
    const playerApiScript = doc.createElement('script');
    playerApiScript.type = 'text/javascript';
    playerApiScript.src = this.api;

    doc.body.appendChild(playerApiScript);
  }

  public loadPlayer(selector, options): Observable<any> {
    return this.apiReady.map((YT) => {
      if (YT['Player']) {
        return new YT.Player(selector, options);
      }
    });
  }

  private onApiReady(): void {
    if (window) {
      this.apiReady.next(window['YT']);
    }
  }

}
