import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'pys-shuffle-button',
  templateUrl: './shuffle-button.component.html',
  styleUrls: ['./shuffle-button.component.scss']
})
export class ShuffleButtonComponent implements OnInit {
  tooltip = 'Click to shuffle playlist';

  @Input() shuffles;

  @Output() shuffled = new EventEmitter<void>();
  @Output() shuffleCanceled = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {
  }

  shuffle(): void {
    this.shuffled.emit();
  }

  cancelShuffles(): void {
    if (this.shuffles > 0) {
      this.shuffleCanceled.emit();
    }
  }
}
