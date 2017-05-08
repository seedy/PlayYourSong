import { InjectionToken } from '@angular/core';

export interface AppConfig {
  apiEndpoint: string;
}

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

const PYS_CONFIG: AppConfig = {
  apiEndpoint: 'http://localhost:3002'
};

export const pysConfigProvider = {
  provide: APP_CONFIG,
  useValue: PYS_CONFIG
};
