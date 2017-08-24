import {Injectable, Inject, OnInit} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import {Observable} from 'rxjs/Observable';

import {ErrorMessageService} from '../../../shared/services/error-message/error-message.service';
import {YOUTUBE_CONFIG, YoutubeConfig} from '../../config/youtubeConfig';
import {SearchHelperService} from '../../../core/services/searchHelper/searchHelper.service';

@Injectable()
export class YoutubeSearchService {

  name = 'Youtube';
  endpoint: string;

  constructor(
    private http: Http,
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
    return this.http.get(url)
      .map((response) => Object.assign(response.json(), {query: string}))
      .catch((err, caught) => this.errorMessage.handleError(err, caught, true));
  }

}
