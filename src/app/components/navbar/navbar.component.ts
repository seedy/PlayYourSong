import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pys-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;

  constructor() { }

  ngOnInit() {
  }

}
