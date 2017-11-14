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

  onSaveQueue(): void {
    this.playlistControlService.saveQueueControlChange();
  }

  onClearQueue(): void {
    this.playlistControlService.clearQueueControlChange();
  }

  onRepeatMode(mode: string): void {
    this.playlistControlService.repeatModeControlChange(mode);
  }

  onShuffled(): void {
    this.playlistControlService.shuffleControlChange();
  }

  onShuffleCanceled(): void {
    this.playlistControlService.cancelShuffleControl();
  }

  private getShuffleCount(): void {
    this.playlistControlService.shuffleCountSource$
      .subscribe((number) => this.shuffles = number);
  }

}
