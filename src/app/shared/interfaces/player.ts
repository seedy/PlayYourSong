import {Track} from '../classes/track';

export interface Player {
  track: Track;
  onManualTrackChange(oldTrack: Track, newTrack: Track): void ;
}
