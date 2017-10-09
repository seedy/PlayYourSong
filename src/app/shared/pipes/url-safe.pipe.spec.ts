import { UrlSafePipe } from './url-safe.pipe';
import {DomSanitizer} from '@angular/platform-browser';
import {async, TestBed} from '@angular/core/testing';

describe('UrlSafePipe', () => {

  let fixture;

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlSafePipe ],
      providers: [ DomSanitizer ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.get(UrlSafePipe);
  });

  it('create an instance', () => {
    expect(fixture).toBeTruthy();
  });
});
