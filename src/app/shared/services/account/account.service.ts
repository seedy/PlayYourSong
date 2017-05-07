import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {AppConfig, APP_CONFIG} from '../../../core/config/pysConfig';
import {StorageService} from '../storage/storage.service';
import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class AccountService {

  endpoint: string;

  constructor(private authHttp: AuthHttp, @Inject(APP_CONFIG) config: AppConfig, public storage: StorageService) {
    this.endpoint = config.apiEndpoint + '/account';
  }

  update(account): Observable<any> {
    const url = this.endpoint + '/' + account.id;
    const json = {
      username: account.username,
      email: account.email,
      password: account.password
    };
    return this.authHttp.put(url, JSON.stringify(json));
  }
}
