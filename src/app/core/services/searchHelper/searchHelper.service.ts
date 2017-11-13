import {Injectable} from '@angular/core';

import {Searchable} from '../../../shared/classes/searchable';
import {ResultHelperService} from '../resultHelper/result-helper.service';

@Injectable()
export class SearchHelperService {

  private services: Searchable[] = [];

  constructor(private resultHelper: ResultHelperService) { }

  public register(name: string, service: Injectable, fn: Function): void {
    const searchable = new Searchable(
      name,
      service.constructor.name,
      service,
      fn,
      false
    );
    this.services.push(searchable);
  }

  public query(text: string): void {
    this.services
      .filter((service) => service.active)
      .forEach((service) => {
        return service.query.call(service.service, text)
          .subscribe(
          (result) => this.resultHelper.storeResult(service.id, result)
        );
      });
  }

  public getServices(): Searchable[] {
    return this.services;
  }

  public activateServices(names: string[]): void {
    this.services.forEach((service) => {
      if (names.indexOf(service.name) !== -1) {
        service.active = true;
      }
    });
  }

}
