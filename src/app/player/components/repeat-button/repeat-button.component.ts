import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {RepeatMode} from '../../../shared/classes/repeat-mode';
import {PlaylistControlService} from '../../../shared/services/playlist-control/playlist-control.service';


@Component({
  selector: 'pys-repeat-button',
  templateUrl: './repeat-button.component.html',
  styleUrls: ['./repeat-button.component.scss']
})
export class RepeatButtonComponent implements OnInit {

  @Output() onRepeatModeChanged = new EventEmitter<string>();
  repeatModes = [
    new RepeatMode(
      RepeatMode.NONE,
      'Toggle to repeat playlist',
      'repeat',
      'default'
    ),
    new RepeatMode(
      RepeatMode.LIST,
      'Toggle to repeat track',
      'repeat',
      'primary'
    ),
    new RepeatMode(
      RepeatMode.TRACK,
      'Toggle not to repeat',
      'repeat_one',
      'primary'
    )
  ];

  constructor(
    private playlistControlService: PlaylistControlService
  ) { }

  ngOnInit() {
    this.repeatModeChanged(this.repeatModes[0].id);
  }

  public repeatModeChanged(id: string): void {
    const mode = this.getMode(id);
    if (mode) {
      this.onRepeatModeChanged.emit(mode.id);
    }
  }

  private getMode(id: string): RepeatMode {
    return this.repeatModes.find((rmode: RepeatMode) => rmode.id === id);
  }

}
