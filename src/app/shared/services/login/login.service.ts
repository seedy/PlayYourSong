import {Injectable, Inject} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {JwtHelper, AuthHttp} from 'angular2-jwt';

import {AppConfig, APP_CONFIG} from '../../../core/config/pysConfig';
import {StorageService} from '../storage/storage.service';
import {ErrorMessageService} from '../error-message/error-message.service';
import {Subject} from 'rxjs/Subject';


@Injectable()
export class LoginService {

  // variables holding login status as observable
  private loggedInSource = new Subject<boolean>();
  isLoggedIn$ = this.loggedInSource.asObservable();

  endpoint: string;
  redirectUrl: string;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(
    private http: Http,
    private authHttp: AuthHttp,
    @Inject(APP_CONFIG) config: AppConfig,
    public storage: StorageService,
    public errorMessage: ErrorMessageService
  ) {
    this.endpoint = config.apiEndpoint + '/account';
  }

  /**
   * Log in API
   * @param credentials
   * @returns {Observable<any>}
   */
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
          this.updateLoggedIn();
        }

        return response;
      })
      .catch((err, caught) => this.errorMessage.handleError(err, caught, true));
  }

  /**
   * Register API
   * @param credentials
   * @returns {Observable<any>}
   */
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
      if (response.token) {
        this.storage.storeKey('token', response.token);
      }

      return response;
    })
    .catch((err, caught) => this.errorMessage.handleError(err, caught, true));
  }

  /**
   * DEV ONLY! Check stored token against backend
   * @returns {Observable<any>}
   */
  checkToken(): Observable<any> {
    const url = this.endpoint + '/test';
    return this.authHttp.get(url)
    .catch((err, caught) =>
      this.errorMessage.handleError(err, caught, true)
    );
  }

  /**
   * Log out
   */
  logout(): void {
    this.storage.deleteKey('token');
    this.updateLoggedIn();
  }

  isLoggedIn(): boolean {
    const token = this.storage.getKey('token');
    if (token) {
      return !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }

  private updateLoggedIn(): void {
    this.loggedInSource.next(this.isLoggedIn());
  }
}
