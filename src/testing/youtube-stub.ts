import {Injectable} from '@angular/core';

@Injectable()
export class YoutubeStub {

  Player = jasmine.createSpy('Player');

  constructor() {
    (this.Player as jasmine.Spy).and.returnValue(PlayerStub);
  }
}


class PlayerStub {
  constructor() {
  }
}
