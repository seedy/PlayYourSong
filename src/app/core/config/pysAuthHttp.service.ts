import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

export function pysAuthHttpFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    globalHeaders: [{'Content-Type': 'application/json'}],
  }), http, options);
}

export const pysAuthHttpFactoryProvider = {
  provide: AuthHttp,
  useFactory: pysAuthHttpFactory,
  deps: [Http, RequestOptions]
};
