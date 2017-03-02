import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'pys-sidenav',
  templateUrl: 'tracknav.component.html',
  styleUrls: ['tracknav.component.scss']
})
export class TracknavComponent implements OnInit {
  @Input() open : boolean;
  @Output() onClosed = new EventEmitter<void>();
  playing = false;


  tracks = [
    {text: "Stairway to heaven", path:"", thumbnail: "queue_music"},
    {text: "Riders on the storm", path: "", thumbnail: "touch_app", selected: true},
    {text: "Just a gigolo", path:"", thumbnail: "history"},
    {text: "Funny valentine", path: "", thumbnail: "info"}

  ];
  constructor() { }

  ngOnInit() {
    this.playing = false;
  }

  onTracknavClosed() : void{
    this.onClosed.emit();
  }

  toggle() : void{
    this.open = !this.open;
  }

  togglePlayer() : void{
    this.playing = !this.playing;
  }

}
