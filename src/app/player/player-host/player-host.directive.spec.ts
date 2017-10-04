import { PlayerHostDirective } from './player-host.directive';
import {async, inject, TestBed} from '@angular/core/testing';
import {Component, ViewContainerRef} from '@angular/core';
import {By} from 'protractor';

describe('PlayerHostDirective', () => {

  let testHost, fixture;

  @Component({
    template: '<host pysPlayerHost></host>'
  })

  class HostComponent {

  }

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostComponent ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture  = TestBed.createComponent(HostComponent);
    testHost = fixture.componentInstance;
    fixture.detectChanges(); // trigger initial data binding
  });

  it('should create an instance', () => {
    expect(testHost).toBeTruthy();
  });
});
