import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pys-welcome-bar',
  templateUrl: './welcome-bar.component.html',
  styleUrls: ['welcome-bar.component.scss']
})
export class WelcomeBarComponent implements OnInit {
  tiles = [
    {title:'Welcome to Play Your Song', cols: '4', rows: '6', color: '#ff7043'},
    {title:'Development is still in progress...', cols: '3', rows: '3', color: '#ff8a65'},
    {title:'It will soon come out!', cols: '1', rows: '6', color: '#80cbc4'},
    {title:'In hope to offer you new powers', cols: '3', rows: '3', color: '#29b6f6'}
  ];
  constructor() { }


  ngOnInit() {
  }

}
