import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';

import {Searchable} from '../../../shared/classes/searchable';
import {ResultHelperService} from '../resultHelper/result-helper.service';

@Injectable()
export class SearchHelperService {

  private services: Searchable[] = [];

  constructor(public resultHelper: ResultHelperService) { }

  register(name: string, service: any, fn: Function): void {
    const searchable = new Searchable(
      name,
      service.constructor.name,
      service,
      fn,
      false
    );
    this.services.push(searchable);
  }

  query(text: string): Observable<any>[] {
    return this.services
      .filter((service) => service.active)
      .map((service) => {
        return service.query.call(service.service, text).subscribe(
          (result) => this.resultHelper.storeResult(service.id, result)
        );
      });
  }

  getServices(): Searchable[] {
    return this.services;
  }

}
