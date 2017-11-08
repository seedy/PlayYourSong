import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpEventType} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import {ProgressHelperService} from '../../services/progressHelper/progress-helper.service';

@Injectable()
export class ProgressEventInterceptor implements HttpInterceptor {
  constructor(
    public progressHelper: ProgressHelperService
  ) {};

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .do((event: HttpEvent<any>) => {
        if (
          event.type === HttpEventType.Sent ||
          event.type === HttpEventType.ResponseHeader ||
          event.type === HttpEventType.UploadProgress ||
          event.type === HttpEventType.DownloadProgress ||
          event.type === HttpEventType.Response
        ) {
          this.progressHelper.storeEvent(event);
        }

      });
  }
}
