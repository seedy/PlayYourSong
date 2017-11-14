import {Component, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'pys-save-button',
  templateUrl: './save-button.component.html',
  styleUrls: ['./save-button.component.scss']
})
export class SaveButtonComponent implements OnInit {
  tooltip = 'Click to save current playlist';
  @Output() queueSaved = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  saveQueue(): void {
    this.queueSaved.emit();
  }

}
