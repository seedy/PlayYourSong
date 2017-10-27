import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Track} from '../../../shared/classes/track';
import {PlaylistControlService} from '../../../shared/services/playlist-control/playlist-control.service';
import {CircularList} from '../../../shared/classes/circular-list';

@Component({
  selector: 'pys-playlist',
  templateUrl: 'playlist.component.html',
  styleUrls: ['playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  list: CircularList<Track>;

  constructor(
    private playlistControlService: PlaylistControlService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadPlaylist();
  }

  public loadPlaylist(): void {
    this.playlistControlService.playlist$.subscribe((newList: CircularList<Track>) => {
      this.list = newList;
      this.ref.detectChanges();
    });
  }

  public selectTrack(track: Track): void {
    this.playlistControlService.selectControl(track);
  }

  public removeTrack(track: Track): void {
    this.playlistControlService.queueOutControl(track);
  }

}
