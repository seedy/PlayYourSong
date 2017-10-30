import {Injectable} from '@angular/core';

@Injectable()
export class JwtHelperStub {
  isTokenExpired = jasmine.createSpy('isTokenExpired');
  constructor() {
  }

}
