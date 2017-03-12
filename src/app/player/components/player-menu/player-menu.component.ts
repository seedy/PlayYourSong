import {Component, OnInit, Input} from '@angular/core';

import { PlaylistControlService } from '../../../shared/services/playlist-control/playlist-control.service';

@Component({
  selector: 'pys-player-menu',
  templateUrl: './player-menu.component.html',
  styleUrls: ['./player-menu.component.scss'],
  providers: [PlaylistControlService]
})
export class PlayerMenuComponent implements OnInit {
  playing: boolean;
  @Input() fullMode: boolean;
  constructor(private playlistControlService: PlaylistControlService) {

  }

  ngOnInit() {
    this.playing = false;
  }

  playPause(): void {
    this.playing = !this.playing;
  }

  notifySaveQueue(): void {
    this.playlistControlService.saveQueueControlChange();
  }

  notifyClearQueue(): void {
    this.playlistControlService.clearQueueControlChange();
  }

  notifyRepeatMode(mode: string): void {
    this.playlistControlService.repeatModeControlChange(mode);
  }

  notifyShuffle(): void {
    this.playlistControlService.shuffleControlChange(true);
  }

  notifyShuffleCanceled(): void {
    this.playlistControlService.shuffleControlChange(false);
  }

}
