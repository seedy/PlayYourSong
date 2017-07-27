import {Injectable} from '@angular/core';

import {Searchable} from '../../../shared/classes/searchable';
import {ResultHelperService} from '../resultHelper/resultHelper.service';

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

  query(text: string): void {
    this.services
      .forEach((service) => {
        if (service.active) {
          service.query.call(service.service, text).subscribe(
            (result) => this.resultHelper.storeResult(service.id, result)
          );
        }

      });
  }

  getServices(): Searchable[] {
    return this.services;
  }

}
