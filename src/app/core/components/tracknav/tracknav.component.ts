import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'pys-tracknav',
  templateUrl: './tracknav.component.html',
  styleUrls: ['./tracknav.component.scss']
})
export class TracknavComponent {
  @Input() open: boolean;
  @Output() closed = new EventEmitter<void>();

  constructor() { }

  public onTracknavClosed(): void {
    this.closed.emit();
  }

  public toggle(): void {
    this.open = !this.open;
  }
}
