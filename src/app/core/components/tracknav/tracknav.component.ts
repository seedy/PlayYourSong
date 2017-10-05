import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'pys-tracknav',
  templateUrl: './tracknav.component.html',
  styleUrls: ['./tracknav.component.scss']
})
export class TracknavComponent implements OnInit {
  @Input() open: boolean;
  @Output() onClosed = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onTracknavClosed(): void {
    this.onClosed.emit();
  }

  toggle(): void {
    this.open = !this.open;
  }
}
