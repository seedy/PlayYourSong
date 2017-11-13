import {Injectable} from '@angular/core';
import {Track} from '../app/shared/classes/track';
import {Searchable} from '../app/shared/classes/searchable';

@Injectable()
export class ClassesStub {
  public newTrack(id: string): Track {
    return new Track(id, '', '', '', '');
  }

  public newSearchable(id: string): Searchable {
    const queryFn = jasmine.createSpy('query');
    return new Searchable(id, '', '', queryFn, false);
  }

}
