import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {pysYoutubeConfigProvider} from './config/youtubeConfig';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    pysYoutubeConfigProvider
  ]
})
export class YoutubeModule { }
