import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PlaylistControlService {

  private clearQueueSource = new Subject<void>();
  private repeatModeSource = new Subject<string>();
  private shuffleSource = new Subject<boolean>();
  private saveQueueSource = new Subject<void>();

  clearQueueControl$ = this.clearQueueSource.asObservable();
  repeatModeControl$ = this.repeatModeSource.asObservable();
  shuffleControl$ = this.shuffleSource.asObservable();
  saveQueueControl$ = this.saveQueueSource.asObservable();

  constructor() { }

  clearQueueControlChange(): void {
    this.clearQueueSource.next();
  }

  repeatModeControlChange(mode: string): void {
    this.repeatModeSource.next(mode);
  }

  shuffleControlChange(doShuffle: boolean): void {
    this.shuffleSource.next(doShuffle);
  }

  saveQueueControlChange(): void {
    this.saveQueueSource.next();
  }

}
