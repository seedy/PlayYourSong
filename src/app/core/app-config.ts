import { InjectionToken } from '@angular/core';

export interface AppConfig {
  apiEndpoint: string;
}

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export const PYS_CONFIG: AppConfig = {
  apiEndpoint: 'http://localhost:3002'
};
