import {Component, OnInit, Input} from '@angular/core';

import { PlaylistControlService } from '../../../shared/services/playlist-control/playlist-control.service';

@Component({
  selector: 'pys-player-menu',
  templateUrl: './player-menu.component.html',
  styleUrls: ['./player-menu.component.scss']
})
export class PlayerMenuComponent implements OnInit {
  @Input() fullMode: boolean;
  shuffles = 0;

  constructor(
    private playlistControlService: PlaylistControlService
  ) { }

  ngOnInit() {
    this.getShuffleCount();
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
    this.playlistControlService.shuffleControlChange();
  }

  notifyShuffleCanceled(): void {
    this.playlistControlService.cancelShuffleControl();
  }

  private getShuffleCount(): void {
    this.playlistControlService.shuffleCountSource$
      .subscribe((number) => this.shuffles = number);
  }

}
