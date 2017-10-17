import { InjectionToken } from '@angular/core';

import { environment } from '../../../environments/environment';

const apiKey = environment.youtubeApiKey;

export interface YoutubeConfig {
  apiEndpoint: string;
  apiKey: string;
}

export let YOUTUBE_CONFIG = new InjectionToken<YoutubeConfig>('app.config');

const PYS_YOUTUBE_CONFIG: YoutubeConfig = {
  apiEndpoint: 'https://www.googleapis.com/youtube/v3',
  apiKey: apiKey
};

export const pysYoutubeConfigProvider = {
  provide: YOUTUBE_CONFIG,
  useValue: PYS_YOUTUBE_CONFIG
};
