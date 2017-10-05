import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {Track} from '../../classes/track';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {CircularList} from '../../classes/circular-list';

@Injectable()
export class PlaylistControlService {

  // mock for dev
  private mock = new CircularList([
    new Track('Kingston town', '', 'youtube', 'w0c_dv0TUmU', 'info'),
    new Track('Stairway to heaven', '', '', 'xYC_78PUrZg', 'queue_music'),
    new Track('Riders on the storm', '', '', 'xYC_78PUrZg', 'touch_app')
  ]);
  private playlist = new BehaviorSubject<CircularList<Track>>(this.mock);

  private clearQueueSource = new Subject<void>();
  private repeatModeSource = new Subject<string>();
  private shuffleSource = new Subject<boolean>();
  private saveQueueSource = new Subject<void>();

  public playlist$ = this.playlist.asObservable();

  public clearQueueControl$ = this.clearQueueSource.asObservable();
  public repeatModeControl$ = this.repeatModeSource.asObservable();
  public shuffleControl$ = this.shuffleSource.asObservable();
  public saveQueueControl$ = this.saveQueueSource.asObservable();

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
