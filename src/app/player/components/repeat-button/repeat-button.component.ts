import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pys-repeat-button',
  templateUrl: './repeat-button.component.html',
  styleUrls: ['./repeat-button.component.scss']
})
export class RepeatButtonComponent implements OnInit {
  replayModes = [
    {
      tooltip: 'Toggle to repeat playlist',
      icon: 'repeat',
      themeColor: 'default'
    },
    {
      tooltip: 'Toggle to repeat track',
      icon: 'repeat',
      themeColor: 'primary'
    },
    {
      tooltip: 'Toggle not to repeat',
      icon: 'repeat_one',
      themeColor: 'primary'
    }
  ];

  constructor() { }

  ngOnInit() {

  }

}
