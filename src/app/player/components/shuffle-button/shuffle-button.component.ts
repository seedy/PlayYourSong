import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'pys-shuffle-button',
  templateUrl: './shuffle-button.component.html',
  styleUrls: ['./shuffle-button.component.scss']
})
export class ShuffleButtonComponent implements OnInit {
  tooltip = "Click to shuffle playlist";
  shuffles = 0;

  constructor() {}

  ngOnInit() {
  }

  @Output() onShuffle = new EventEmitter<void>();
  @Output() onShuffleCanceled = new EventEmitter<void>();

  shuffle(): void {
    this.shuffles++;
    this.onShuffle.emit();
  }

  cancelShuffles(): void{
    if(this.shuffles > 0){
      this.shuffles = 0;
      this.onShuffleCanceled.emit();
    }
  }
}
