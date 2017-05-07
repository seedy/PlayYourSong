import {Injectable, Inject} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { JwtHelper } from 'angular2-jwt';

import {APP_CONFIG, AppConfig} from '../../../core/config/pysConfig';
import {StorageService} from '../storage/storage.service';


@Injectable()
export class LoginService {

  endpoint: string;
  redirectUrl: string;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http, @Inject(APP_CONFIG) config: AppConfig, public storage: StorageService) {
    this.endpoint = config.apiEndpoint + '/account';
  }

  isLoggedIn(): boolean {
    const token = this.storage.getKey('token');
    if (token) {
      return this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }

  login(credentials): Observable<any> {
    const url = this.endpoint + '/login';
    const json = {
      identifier: credentials.identifier,
      password: credentials.password
    };
    return this.http.post(url, JSON.stringify(json))
      .map((response) => response.json())
      .map((response) => {
        if (response.token) {
          this.storage.storeKey('token', response.token);
        }

        return response;
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
          this.storage.storeKey('token', response.token);
        }

        return response.success;
      });
  }

  logout(): void {
    this.storage.deleteKey('token');
  }
}
