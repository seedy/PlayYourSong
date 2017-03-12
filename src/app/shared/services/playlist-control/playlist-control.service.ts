import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PlaylistControlService {

  private repeatModeSource = new Subject<string>();

  constructor() { }

  repeatModeControl$ = this.repeatModeSource.asObservable();

  repeatModeControlChange(mode: string): void {
    this.repeatModeSource.next(mode);
  }

}
