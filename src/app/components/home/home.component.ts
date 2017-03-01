import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pys-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {
  sidenavOpen : boolean;
  constructor() { }

  ngOnInit() {
    this.sidenavOpen = false;
  }

  toggleSidenav(){
    this.sidenavOpen = !this.sidenavOpen;
  }

  sideNavClosed(){
    this.sidenavOpen = false;
  }

}
