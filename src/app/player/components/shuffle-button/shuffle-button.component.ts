import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'pys-shuffle-button',
  templateUrl: './shuffle-button.component.html',
  styleUrls: ['./shuffle-button.component.scss']
})
export class ShuffleButtonComponent implements OnInit {
  tooltip = 'Click to shuffle playlist';

  @Input() shuffles;

  @Output() onShuffle = new EventEmitter<void>();
  @Output() onShuffleCanceled = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {
  }

  shuffle(): void {
    this.onShuffle.emit();
  }

  cancelShuffles(): void {
    if (this.shuffles > 0) {
      this.onShuffleCanceled.emit();
    }
  }
}
