import {Injectable, Inject, OnInit} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import {Observable} from 'rxjs/Observable';

import {ErrorMessageService} from '../../../shared/services/error-message/error-message.service';
import {YOUTUBE_CONFIG, YoutubeConfig} from '../../config/youtubeConfig';
import {SearchHelperService} from '../../../core/services/searchHelper/searchHelper.service';

@Injectable()
export class YoutubeSearchService {

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
    this.searchHelper.register(this, this.queryVideo);
  }

  /**
   * Youtube data search API
   * @param string
   * @returns {Observable<any>}
   */
  queryVideo(string: string): Observable<any> {
    let query = string.replace(/\s/,'+');
    const url = this.endpoint + query;

    return this.http.get(url)
      .map((response) => response.json())
      .catch((err, caught) => this.errorMessage.handleError(err, caught, true));
  }

}
