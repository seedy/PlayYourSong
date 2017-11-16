import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Tab} from '../../../shared/classes/tab';

@Injectable()
export class ResultHelperService {

  // BehaviourSubject -> init
  private resultSource = new Subject<Tab>();

  resultControl$ = this.resultSource.asObservable();

  constructor() { }

  public storeResult(id: string, result: any): void {
    this.resultSource.next(this.getResultObject(id, result));
  }

  private getResultObject(id: string, result: any): Tab {
    return new Tab(
      id,
      result
  );
  }

}
