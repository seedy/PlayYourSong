import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

// config
import {pysYoutubeConfigProvider} from './config/youtubeConfig';

// services
import {SearchService} from './services/search/search.service';
import {SearchHelperService} from '../core/services/searchHelper/searchHelper.service';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    pysYoutubeConfigProvider,
    SearchService,
    SearchHelperService
  ]
})
export class YoutubeModule {

  constructor( youtubeSearch: SearchService ) {
    youtubeSearch.activate();
  }

}
