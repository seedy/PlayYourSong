import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PlayerLoaderService {

  private api = 'https://www.youtube.com/iframe_api';
  private apiReady = new Subject<any>();

  apiReady$ = this.apiReady.asObservable();

  constructor() { }

  public loadApi(): Observable<any> {
    (<any>window).onYouTubeIframeAPIReady = () => {
      this.onApiReady();
    };
    const doc = window.document;
    const playerApiScript = doc.createElement('script');
    playerApiScript.type = 'text/javascript';
    playerApiScript.src = this.api;

    doc.body.appendChild(playerApiScript);

    return this.apiReady$;
  }

  public loadPlayer(selector, options): Observable<any> {
    return this.apiReady$.map((YT) => {
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
