import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable()
export class LoginService {

  redirectUrl: string;

  constructor() { }

  isLoggedIn(): boolean {
    return false;
  }
}
