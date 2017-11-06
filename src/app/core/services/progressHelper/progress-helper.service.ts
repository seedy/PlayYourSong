import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import { HttpEvent } from '@angular/common/http';

@Injectable()
export class ProgressHelperService {

  private progressEventSource = new Subject<HttpEvent<any>>();

  public progressEventControl$ = this.progressEventSource.asObservable();

  constructor() { }

  public storeEvent(event: HttpEvent<any>): void {
    this.progressEventSource.next(event);
  }

}
