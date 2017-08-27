import {Component, OnInit, Input} from '@angular/core';
import {YoutubeSearchService} from '../../services/youtubeSearch/youtubeSearch.service';

import {Result} from '../../classes/result';

@Component({
  selector: 'pys-youtube-result-list',
  templateUrl: './youtube-result-list.component.html',
  styleUrls: ['./youtube-result-list.component.scss']
})
export class YoutubeResultListComponent implements OnInit {
  @Input() result: Result;
  public pageIndex = 0;
  public isLoading = false;

  constructor(
    private youtubeSearch: YoutubeSearchService
  ) { }

  ngOnInit() {
  }

  onPage(event) {
    let request;
    // we want next page
    if (event.pageIndex > this.pageIndex) {
      request = this.youtubeSearch.queryVideo(this.result.query, event.pageSize, this.result.nextPageToken);
    } else {
      request = this.youtubeSearch.queryVideo(this.result.query, event.pageSize, this.result.prevPageToken);
    }
    this.isLoading = true;
    return request
      .subscribe(
        (result) => {
          this.isLoading = false;
          this.result = result;
          this.pageIndex = event.pageIndex;
        }
      );
  }

  onLoad(item) {
    item.loaded = true;
  }

}
