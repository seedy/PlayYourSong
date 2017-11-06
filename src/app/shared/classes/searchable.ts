import {Injectable} from '@angular/core';

export class Searchable {

  constructor(
    public name: string,
    public id: string,
    public service: Injectable,
    public query: Function,
    public active: boolean
  ) {};

}
