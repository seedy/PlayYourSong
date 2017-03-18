import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor() { }

  getKey(name: string): string {
    return localStorage.getItem(name);
  }

  storeKey(name: string, value: string): void {
    return localStorage.setItem(name, value);
  }

}
