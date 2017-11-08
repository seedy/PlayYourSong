import {Injectable} from '@angular/core';
import {Track} from '../app/shared/classes/track';

@Injectable()
export class RouterStub {

  public navigate = jasmine.createSpy('navigate');

  constructor() {}


}
