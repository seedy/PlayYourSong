import {EventEmitter} from '@angular/core';
import {Track} from './track';

export interface ApiResultListComponent {
  result: any;
  onResultAdded: EventEmitter<Track>;
}
