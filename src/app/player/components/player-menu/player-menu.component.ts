import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pys-player-menu',
  templateUrl: './player-menu.component.html',
  styleUrls: ['./player-menu.component.scss']
})
export class PlayerMenuComponent implements OnInit {
  playing: boolean;

  constructor() { }

  ngOnInit() {
    this.playing = false;
  }

  playPause():void {
    this.playing = !this.playing;
  }



}
