import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'pys-error-message-list',
  templateUrl: './error-message-list.component.html',
  styleUrls: ['./error-message-list.component.scss']
})
export class ErrorMessageListComponent implements OnInit {
  @Input() errorMessages: string[];

  constructor() { }

  ngOnInit() {
  }

}
