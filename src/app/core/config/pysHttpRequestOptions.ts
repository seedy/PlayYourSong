import { Injectable } from '@angular/core';
import { BaseRequestOptions, RequestOptions } from '@angular/http';

@Injectable()
export class PysHttpRequestOptions extends BaseRequestOptions {

  constructor() {
    super();

    // Set the default 'Content-Type' header
    this.headers.set('Content-Type', 'application/json');
  }
}

export const pysRequestOptionsProvider = { provide: RequestOptions, useClass: PysHttpRequestOptions };
