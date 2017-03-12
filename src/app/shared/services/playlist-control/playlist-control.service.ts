import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PlaylistControlService {

  private repeatModeSource = new Subject<string>();
  private shuffleSource = new Subject<boolean>();

  constructor() { }

  repeatModeControl$ = this.repeatModeSource.asObservable();
  shuffleControl$ = this.shuffleSource.asObservable();

  repeatModeControlChange(mode: string): void {
    this.repeatModeSource.next(mode);
  }

  shuffleControlChange(doShuffle: boolean): void {
    this.shuffleSource.next(doShuffle);
  }

}
