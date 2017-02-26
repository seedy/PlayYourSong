import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'pys-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  @Output() onToggleMenu = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  toggleMenu(){
    this.onToggleMenu.emit();
  }
}
