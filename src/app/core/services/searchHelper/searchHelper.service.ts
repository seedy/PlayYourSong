import {Injectable} from '@angular/core';


@Injectable()
export class SearchHelperService {

  services = [];
  searches: string[] = [];

  constructor() { }

  register(service: any, fn: Function): void {
    this.services.push({service: service, query: fn});
  }

  query(text: string): void {
    this.searches.push(text);
    this.services.forEach((service) => service.query.call(service.service, text).subscribe());
  }

}
