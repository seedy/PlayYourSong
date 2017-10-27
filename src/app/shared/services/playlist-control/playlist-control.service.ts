import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {Track} from '../../classes/track';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {CircularList} from '../../classes/circular-list';
import {AsyncSubject} from 'rxjs/AsyncSubject';
import {RepeatMode} from '../../classes/repeat-mode';

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
  private saveQueueSource = new Subject<void>();

  private repeatMode: string;


  private shuffleOrigin: Track[] = [];
  private shuffleCount = 0;
  private shuffleCountSource = new BehaviorSubject<number>(this.shuffleCount);

  public playlist$ = this.playlist.asObservable();

  public clearQueueControl$ = this.clearQueueSource.asObservable();
  public saveQueueControl$ = this.saveQueueSource.asObservable();
  public shuffleCountSource$ = this.shuffleCountSource.asObservable();

  constructor() { }

  public selectControl(track: Track): void {
    this.queue.select(track);
    this.propagateQueueChange();
  }

  public nextControl(): void {
    this.queue.next();
    this.propagateQueueChange();
  }

  public queueInControl(track: Track): void {
    this.queue.push(track);
    this.propagateQueueChange();
    this.propagateQueueShuffleImpact();
  }

  public queueOutControl(track: Track): void {
    this.queue.remove(track);
    this.propagateQueueChange();
    this.propagateQueueShuffleImpact();
  }

  public getRepeatMode(): string {
    return this.repeatMode;
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
    this.repeatMode = mode;
  }

  public shuffleControlChange(): void {
    if (this.queue.list.length === 0) {
      return ;
    }

    if (this.shuffleCount === 0 && this.shuffleOrigin.length === 0) {
      this.shuffleOrigin = this.queue.copy();
    }

    this.shuffleCount++;
    this.propagateShuffleCount();

    this.queue.shuffle();
    this.propagateQueueChange();
  }

  public cancelShuffleControl(): void {
    if (this.shuffleCount > 0) {
      this.shuffleCount = 0;
      this.propagateShuffleCount();
      if (this.shuffleOrigin.length > 0) {
        this.queue.clear();
        this.queue.merge(this.shuffleOrigin);
        this.propagateQueueChange();
      }
    }
  }

  // TODO : implement data storage
  public saveQueueControlChange(): void {
    this.saveQueueSource.next();
  }

  /******************************/
  /*     Private Functions      */
  /******************************/



  /******************************/
  /*     Clear Functions        */
  /******************************/


  private clearQueue(): void {
    this.queue.clear();
    this.propagateQueueChange();
  }

  private clearShuffle(): void {
    this.shuffleCount = 0;
    this.shuffleOrigin = [];
  }

  /******************************/
  /*     Propagation fns        */
  /******************************/

  private propagateShuffleCount(): void {
    this.shuffleCountSource.next(this.shuffleCount);
  }

  private propagateQueueShuffleImpact(): void {
    if (this.shuffleCount > 0) {
      this.clearShuffle();
      this.propagateShuffleCount();
    }
  }

  private propagateQueueChange(): void {
    this.playlist.next(this.queue);
  }

}
