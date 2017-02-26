import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'pys-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Input() open : boolean;
  @Output() onClosed = new EventEmitter<void>();
  accounts = [
    {site: "soundcloud", username: "seedy"}
  ];
  constructor() { }

  ngOnInit() {
  }

  onSidenavClosed(){
    this.onClosed.emit();
  }

}
