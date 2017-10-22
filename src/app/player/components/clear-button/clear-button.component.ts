import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'pys-clear-button',
  templateUrl: './clear-button.component.html',
  styleUrls: ['./clear-button.component.scss']
})
export class ClearButtonComponent implements OnInit {
  tooltip = 'Click to clear current playlist';
  @Output() onClearQueue = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  clearQueue(): void {
    this.onClearQueue.emit();
  }
}
