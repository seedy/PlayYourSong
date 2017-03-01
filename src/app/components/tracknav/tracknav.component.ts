import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'pys-sidenav',
  templateUrl: 'tracknav.component.html',
  styleUrls: ['tracknav.component.scss']
})
export class TracknavComponent implements OnInit {
  @Input() open : boolean;
  @Output() onClosed = new EventEmitter<void>();

  tracks = [
    {text: "Stairway to heaven", path:"", thumbnail: "queue_music", isLoggedIn: true},
    {text: "Riders on the storm", path: "", thumbnail: "touch_app", isLoggedIn: true},
    {text: "Just a gigolo", path:"", thumbnail: "history", isLoggedIn: true},
    {text: "Funny valentine", path: "", thumbnail: "info", isLoggedIn: false}

  ];
  constructor() { }

  ngOnInit() {
  }

  onSidenavClosed(){
    this.onClosed.emit();
  }

}
