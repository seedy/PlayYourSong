import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pys-welcome-bar',
  templateUrl: './welcome-bar.component.html',
  styleUrls: ['./welcome-bar.component.css']
})
export class WelcomeBarComponent implements OnInit {
  tiles = [
    {title:'Welcome to Play Your Song', cols: '4', rows: '1', color: ''},
    {title:'Development is still in progress...', cols: '3', rows: '1', color: ''},
    {title:'But it will soon come!', cols: '1', rows: '2', color: ''},
    {title:'In hope to offer you new powers', cols: '3', rows: '1', color: ''},
    {title:'Search your favorite songs cross-applications', cols: '4', rows: '1', color: ''},
    {title:'Build up your playlist...', cols: '3', rows: '1', color: ''},
    {title:'Within seconds!', cols: '1', rows: '1', color: ''},
  ];
  constructor() { }


  ngOnInit() {
  }

}
