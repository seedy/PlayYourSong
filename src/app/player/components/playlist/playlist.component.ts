import { Component, OnInit } from '@angular/core';
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
    private playlistControlService: PlaylistControlService
  ) { }

  ngOnInit() {
    this.loadPlaylist();
  }

  loadPlaylist(): void {
    this.playlistControlService.playlist$.subscribe((newList: CircularList<Track>) => this.list = newList);
  }

}
