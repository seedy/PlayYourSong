import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ResultHelperService {

  // BehaviourSubject -> init
  private resultSource = new Subject<any>();

  resultControl$ = this.resultSource.asObservable();

  constructor() { }

  storeResult(id: string, result: any): void {
    this.resultSource.next(this.getResultObject(id, result));
  }

  getResultObject(id: string, result: any): Object {
    return {
      id,
      result
    };
  }

}
