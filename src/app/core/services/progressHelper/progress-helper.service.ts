import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Injectable()
export class ProgressHelperService {

  private progressEventSource = new Subject<HttpEvent<any>>();

  progressEventControl$ = this.progressEventSource.asObservable();

  constructor() { }

  storeEvent(event: HttpEvent<any>): void {
    this.progressEventSource.next(event);
  }

}
