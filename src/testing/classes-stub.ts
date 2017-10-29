import {Injectable} from '@angular/core';
import {Track} from '../app/shared/classes/track';

@Injectable()
export class ClassesStub {
  public newTrack(id: string): Track {
    return new Track(id, '', '', '', '');
  }


}
