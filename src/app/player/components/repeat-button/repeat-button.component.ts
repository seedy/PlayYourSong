import {Component, OnInit, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'pys-repeat-button',
  templateUrl: './repeat-button.component.html',
  styleUrls: ['./repeat-button.component.scss']
})
export class RepeatButtonComponent implements OnInit {

  @Output() onRepeatModeChanged = new EventEmitter<string>();
  repeatModes = [
    {
      id: 'repeat-none',
      tooltip: 'Toggle to repeat playlist',
      icon: 'repeat',
      themeColor: 'default'
    },
    {
      id: 'repeat-list',
      tooltip: 'Toggle to repeat track',
      icon: 'repeat',
      themeColor: 'primary'
    },
    {
      id: 'repeat-track',
      tooltip: 'Toggle not to repeat',
      icon: 'repeat_one',
      themeColor: 'primary'
    }
  ];

  constructor() { }

  ngOnInit() {

  }

  repeatModeChanged(id: string): void {
    const mode = this.repeatModes.find((rmode) => rmode.id === id);
    if (mode) {
      this.onRepeatModeChanged.emit(mode.id);
    }
  }

}
