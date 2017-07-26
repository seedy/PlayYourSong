import {Injectable} from '@angular/core';

import {Searchable} from '../../../shared/classes/searchable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class SearchHelperService {

  searches: string[] = [];
  private services: Searchable[] = [];

  constructor() { }

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
    this.searches.push(text);
    this.services
      .forEach((service) => {
        if (service.active) {
          service.query.call(service.service, text).subscribe()
        }
      });
  }

  getServices(): Searchable[] {
    return this.services;
  }

}
