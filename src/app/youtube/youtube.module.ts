import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

// config
import {pysYoutubeConfigProvider} from './config/youtubeConfig';

// services
import {YoutubeSearchService} from './services/youtubeSearch/youtubeSearch.service';
import {SearchHelperService} from '../core/services/searchHelper/searchHelper.service';
import { YoutubeResultListComponent } from './components/youtube-result-list/youtube-result-list.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [YoutubeResultListComponent],
  providers: [
    pysYoutubeConfigProvider,
    YoutubeSearchService,
    SearchHelperService
  ]
})
export class YoutubeModule {

  constructor( youtubeSearch: YoutubeSearchService ) {
    youtubeSearch.activate();
  }

}
