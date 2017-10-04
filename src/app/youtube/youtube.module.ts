import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

// config
import {pysYoutubeConfigProvider} from './config/youtubeConfig';

// services
import {YoutubeSearchService} from './services/youtubeSearch/youtubeSearch.service';
import {SearchHelperService} from '../core/services/searchHelper/searchHelper.service';

// modules
import {MaterialModule} from '../material/material.module';


// components
import { YoutubeResultListComponent } from './components/youtube-result-list/youtube-result-list.component';
import { YoutubePlayerInstanceComponent } from './components/youtube-player-instance/youtube-player-instance.component';
import {SharedModule} from '../shared/shared.module';
import {PlayerLoaderService} from './services/player-loader/player-loader.service';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule
  ],
  declarations: [
    YoutubeResultListComponent,
    YoutubePlayerInstanceComponent
  ],
  providers: [
    pysYoutubeConfigProvider,
    YoutubeSearchService,
    SearchHelperService,
    PlayerLoaderService
  ],
  exports: [
    YoutubeResultListComponent
  ]
})
export class YoutubeModule {

  constructor( youtubeSearch: YoutubeSearchService ) {
    youtubeSearch.activate();
  }

}
