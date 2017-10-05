import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/skipWhile';

// config
import {YOUTUBE_CONFIG, YoutubeConfig} from '../../config/youtubeConfig';

// services
import {ErrorMessageService} from '../../../shared/services/error-message/error-message.service';
import {SearchHelperService} from '../../../core/services/searchHelper/searchHelper.service';

@Injectable()
export class YoutubeSearchService {

  name = 'Youtube';
  endpoint: string;

  constructor(
    private http: Http,
    private httpClient: HttpClient,
    private searchHelper: SearchHelperService,
    @Inject(YOUTUBE_CONFIG) config: YoutubeConfig,
    public errorMessage: ErrorMessageService
  ) {
    this.endpoint = config.apiEndpoint + '/search?part=snippet&type=video&key=' + config.apiKey + '&q=';
  }

  activate(): void {
    this.searchHelper.register(this.name, this, this.queryVideo);
  }

  /**
   * Youtube data search API
   * @param string
   * @param maxResults
   * @param pageToken
   * @returns {Observable<any>}
   */
  queryVideo(string: string, maxResults?: number, pageToken?: string): Observable<any> {
    let query = string.replace(/\s/,'+');
    let url = this.endpoint + query + '&maxResults=' + (maxResults || 10);

    if (pageToken) {
      url += ('&pageToken=' + pageToken);
    }

    return this.httpClient.get(url, {
      reportProgress: true,
      observe: 'events'
    })
    .skipWhile((response) => ! (response instanceof HttpResponse))
    .map((response: HttpResponse<any>) => {
      return Object.assign(response.body, {query: string});
    })
    .catch((err, caught) => this.errorMessage.handleError(err, caught, true));

  }
}
