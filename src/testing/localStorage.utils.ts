import {Injectable} from '@angular/core';
@Injectable()
export class LocalStorageUtils {
  public activateSpies(): void {
    spyOn(localStorage, 'getItem');
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'removeItem');
  }

  public storeMocks(list: string[]): void {
    list.forEach((mock) => localStorage.setItem(mock, mock));
  }

  public isStored(key: string): boolean {
    (localStorage.getItem as jasmine.Spy).and.callThrough();
    const isStored = localStorage.getItem(key) !== null;
    (localStorage.getItem as jasmine.Spy).and.stub();
    return isStored;
  }

}
