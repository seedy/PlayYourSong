import {Injectable, Inject} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import {APP_CONFIG, AppConfig} from '../../../core/config/pys-config';

@Injectable()
export class LoginService {

  endpoint: string;
  redirectUrl: string;

  constructor(private http: Http, @Inject(APP_CONFIG) config: AppConfig) {
    this.endpoint = config.apiEndpoint + '/account';
  }

  isLoggedIn(): boolean {
    return tokenNotExpired();
  }

  login(credentials): Observable<any> {
    const url = this.endpoint + '/login';
    const json = {
      username: credentials.username,
      password: credentials.password
    };
    return this.http.post(url, json)
      .map((response) => response.json())
      .map((response) => {
        if (response.success) {
          localStorage.setItem('token', response.token);
        }

        return response.success;
      });
  }

  register(credentials): Observable<any> {
    const url = this.endpoint + '/register';
    const json = {
      username: credentials.username,
      email: credentials.email,
      password: credentials.password
    };
    return this.http.post(url, JSON.stringify(json))
      .map((response) => response.json())
      .map((response) => {
        if (response.success) {
          localStorage.setItem('token', response.token);
        }

        return response.success;
      });
  }
}
