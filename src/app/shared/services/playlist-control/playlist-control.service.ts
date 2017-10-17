import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {Track} from '../../classes/track';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {CircularList} from '../../classes/circular-list';

@Injectable()
export class PlaylistControlService {

  // mock for dev
  private queue = new CircularList([
    new Track('Kingston town', '', 'youtube', 'w0c_dv0TUmU', 'info'),
    new Track('Stairway to heaven', '', 'youtube', 'xYC_78PUrZg', 'queue_music'),
    new Track('Riders on the storm', '', 'youtube', 'xYC_78PUrZg', 'touch_app')
  ]);
  private playlist = new BehaviorSubject<CircularList<Track>>(this.queue);

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

  public selectControl(track: Track): void {
    this.queue.select(track);
    this.propagateQueueChange();
  }

  public queueInControl(track: Track): void {
    this.queue.push(track);
    this.propagateQueueChange();
  }

  /******************************/
  /*     Observable Actions     */
  /******************************/

  public clearQueueControlChange(): void {
    this.clearQueueSource.next();
    this.clearQueue();
  }

  // TODO : integrate to player
  public repeatModeControlChange(mode: string): void {
    this.repeatModeSource.next(mode);
  }

  public shuffleControlChange(doShuffle: boolean): void {
    this.shuffleSource.next(doShuffle);
  }

  // TODO : implement data storage
  public saveQueueControlChange(): void {
    this.saveQueueSource.next();
  }

  /******************************/
  /*     Private Functions      */
  /******************************/

  private clearQueue(): void {
    this.queue.clear();
    this.propagateQueueChange();
  }



  private propagateQueueChange(): void {
    this.playlist.next(this.queue);
  }

}
