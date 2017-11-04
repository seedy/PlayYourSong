import {Injectable, Inject} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {JwtHelper, AuthHttp} from 'angular2-jwt';

import {AppConfig, APP_CONFIG} from '../../../core/config/pysConfig';
import {StorageService} from '../storage/storage.service';
import {ErrorMessageService} from '../error-message/error-message.service';
import {Subject} from 'rxjs/Subject';
import {Credentials} from '../../classes/credentials';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Account} from '../../classes/account';


@Injectable()
export class LoginService {

  public jwtHelper = new JwtHelper();

  // variables holding login status as observable
  private loggedInSource = new BehaviorSubject<boolean>(this.isLoggedIn());
  isLoggedIn$ = this.loggedInSource.asObservable();

  endpoint: string;
  redirectUrl: string;

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
  public login(credentials: Credentials): Observable<any> {
    const url = this.endpoint + '/login';
    return this.http.post(url, JSON.stringify(credentials))
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

  public register(account: Account): Observable<any> {
    const url = this.endpoint + '/register';

    return this.http.post(url, JSON.stringify(account))
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
   * DEV ONLY! Check stored token against backend
   * @returns {Observable<any>}
   */
  public checkToken(): Observable<any> {
    const url = this.endpoint + '/test';
    return this.authHttp.get(url)
    .catch((err, caught) =>
      this.errorMessage.handleError(err, caught, true)
    );
  }

  /**
   * Log out
   */
  public logout(): void {
    this.storage.deleteKey('token');
    this.updateLoggedIn();
  }

  public isLoggedIn(): boolean {
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
