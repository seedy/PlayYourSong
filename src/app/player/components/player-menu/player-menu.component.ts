import { Component, OnInit } from '@angular/core';

import { PlaylistControlService } from '../../../shared/services/playlist-control/playlist-control.service';

@Component({
  selector: 'pys-player-menu',
  templateUrl: './player-menu.component.html',
  styleUrls: ['./player-menu.component.scss'],
  providers: [PlaylistControlService]
})
export class PlayerMenuComponent implements OnInit {
  playing: boolean;

  constructor(private playlistControlService: PlaylistControlService) {

  }

  ngOnInit() {
    this.playing = false;
  }

  playPause():void {
    this.playing = !this.playing;
  }

  notifyRepeatMode(mode: string): void{
    this.playlistControlService.repeatModeControlChange(mode);
  }



}
