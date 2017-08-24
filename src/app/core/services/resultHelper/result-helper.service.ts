import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ResultHelperService {

  private resultSource = new Subject<any>();

  resultControl$ = this.resultSource.asObservable();

  constructor() { }

  storeResult(id: string, result: any): void {
    this.resultSource.next({id, result});
  }

}