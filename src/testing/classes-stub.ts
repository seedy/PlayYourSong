import {Injectable} from '@angular/core';
import {Track} from '../app/shared/classes/track';
import {Searchable} from '../app/shared/classes/searchable';
import {Tab} from '../app/shared/classes/tab';

@Injectable()
export class ClassesStub {
  public newTrack(id: string): Track {
    return new Track(id, '', '', '', '');
  }

  public newSearchable(id: string): Searchable {
    const queryFn = jasmine.createSpy('query');
    return new Searchable(id, '', '', queryFn, false);
  }

  public newTab(id: string, name?: string): Tab {
    return new Tab(id, {}, name);
  }

}
