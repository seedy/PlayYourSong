import {TestBed, inject, async} from '@angular/core/testing';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeLast';
import 'rxjs/add/operator/skip';

import { PlaylistControlService } from './playlist-control.service';
import {Track} from '../../classes/track';
import {CircularList} from '../../classes/circular-list';
import {ClassesStub} from '../../../../testing/classes-stub';

describe('PlaylistControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlaylistControlService, ClassesStub]
    });
  });

  it('checks service public api', inject([PlaylistControlService], (service: PlaylistControlService) => {
    expect(service).toBeTruthy();

    expect(service.playlist$).toEqual(jasmine.any(Observable));
    expect(service.clearQueueControl$).toEqual(jasmine.any(Observable));
    expect(service.saveQueueControl$).toEqual(jasmine.any(Observable));
    expect(service.shuffleCountSource$).toEqual(jasmine.any(Observable));

    expect(service.selectControl).toEqual(jasmine.any(Function));
    expect(service.nextControl).toEqual(jasmine.any(Function));
    expect(service.queueInControl).toEqual(jasmine.any(Function));
    expect(service.queueOutControl).toEqual(jasmine.any(Function));
    expect(service.getRepeatMode).toEqual(jasmine.any(Function));
    expect(service.clearQueueControlChange).toEqual(jasmine.any(Function));
    expect(service.repeatModeControlChange).toEqual(jasmine.any(Function));
    expect(service.shuffleControlChange).toEqual(jasmine.any(Function));
    expect(service.cancelShuffleControl).toEqual(jasmine.any(Function));
    expect(service.saveQueueControlChange).toEqual(jasmine.any(Function));

  }));

  it('checks method selectControl, empty queue',
    async(inject([PlaylistControlService, ClassesStub], (service: PlaylistControlService, classes: ClassesStub) => {
    const track = classes.newTrack('mock');
    const emptyQueue = new CircularList([]);
    service.playlist$.subscribe((queue) => {
      expect(queue).toEqual(emptyQueue);
    });
    service.selectControl(track);
  })));

  it('checks method selectControl, after adding to queue, select not in queue',
    async(inject([PlaylistControlService, ClassesStub], (service: PlaylistControlService, classes: ClassesStub) => {
      const track = classes.newTrack('mock');
      const otherTrack = classes.newTrack('other');
      const emptyQueue = new CircularList();
      const otherInQueue = new CircularList([otherTrack]);

      // playlist observable emits empty list at first
      service.playlist$.take(1).subscribe((queue) => {
        expect(queue).toEqual(emptyQueue);
      });

      // playlist observable emits list with otherTrack at second and third
      service.playlist$.skip(1).subscribe((queue) => {
        expect(queue).toEqual(otherInQueue);
      });

      service.queueInControl(otherTrack);

      service.selectControl(track);
    })));

  it('checks method selectControl, after adding to queue, select in queue',
    async(inject([PlaylistControlService, ClassesStub], (service: PlaylistControlService, classes: ClassesStub) => {
      const track = classes.newTrack('mock');
      const otherTrack = classes.newTrack('other');
      const emptyQueue = new CircularList();
      const trackInQueue = new CircularList([otherTrack, track]);
      const trackFirstInQueue = new CircularList([track, otherTrack]);

      // playlist observable emits empty list at first
      service.playlist$.take(1).subscribe((queue) => {
        expect(queue).toEqual(emptyQueue);
      });


      // playlist observable emits list with otherTrack and track after adding them
      service.playlist$.take(3).skip(2).subscribe((queue) => {
        expect(queue).toEqual(trackInQueue);
      });

      // playlist observable emits list with track selected
      service.playlist$.skip(3).subscribe((queue) => {
        expect(queue).toEqual(trackFirstInQueue);
      });

      service.queueInControl(otherTrack);
      service.queueInControl(track);

      service.selectControl(track);
    })));

  it('checks method nextControl, empty queue',
    async(inject([PlaylistControlService], (service: PlaylistControlService) => {
      const emptyQueue = new CircularList([]);
      service.playlist$.subscribe((queue) => {
        expect(queue).toEqual(emptyQueue);
      });
      service.nextControl();
    })));

  it('checks method nextControl, after adding to queue, only one element',
    async(inject([PlaylistControlService, ClassesStub], (service: PlaylistControlService, classes: ClassesStub) => {
      const track = classes.newTrack('mock');
      const emptyQueue = new CircularList([]);
      const noChangeQueue = new CircularList([track]);
      service.playlist$.take(1).subscribe((queue) => {
        expect(queue).toEqual(emptyQueue);
      });

      service.playlist$.skip(1).subscribe((queue) => {
        expect(queue).toEqual(noChangeQueue);
      });

      service.queueInControl(track);
      service.nextControl();
    })));

  it('checks method nextControl, after adding to queue',
    async(inject([PlaylistControlService, ClassesStub], (service: PlaylistControlService, classes: ClassesStub) => {
      const track = classes.newTrack('mock');
      const otherTrack = classes.newTrack('other');
      const emptyQueue = new CircularList([]);
      const noChangeQueue = new CircularList([track, otherTrack]);
      const changedQueue = new CircularList([otherTrack, track]);

      service.playlist$.take(1).subscribe((queue) => {
        expect(queue).toEqual(emptyQueue);
      });

      service.playlist$.take(3).skip(2).subscribe((queue) => {
        expect(queue).toEqual(noChangeQueue);
      });

      service.playlist$.skip(3).subscribe((queue) => {
        expect(queue).toEqual(changedQueue);
      });

      service.queueInControl(track);
      service.queueInControl(otherTrack);

      service.nextControl();
    })));

  it('checks method queueInControl, no shuffle impact',
    async(inject([PlaylistControlService, ClassesStub], (service: PlaylistControlService, classes: ClassesStub) => {
      const track = classes.newTrack('mock');
      const emptyQueue = new CircularList([]);
      const queueInQueue = new CircularList([track]);

      service.playlist$.take(1).subscribe((queue) => {
        expect(queue).toEqual(emptyQueue);
      });

      service.playlist$.skip(1).subscribe((queue) => {
        expect(queue).toEqual(queueInQueue);
      });

      service.queueInControl(track);

    })));

  it('checks method queueInControl, shuffle impact',
    async(inject([PlaylistControlService, ClassesStub], (service: PlaylistControlService, classes: ClassesStub) => {
      const anyTrack = classes.newTrack('mock');
      const otherTrack = classes.newTrack('other');
      const track = classes.newTrack('track');
      const emptyQueue = new CircularList([]);
      const queueInQueue = new CircularList([anyTrack, otherTrack]);

      service.playlist$.take(1).subscribe((queue) => {
        expect(queue).toEqual(emptyQueue);
      });

      service.playlist$.take(3).skip(2).subscribe((queue) => {
        expect(queue).toEqual(queueInQueue);
      });

      // partial matching because we can't know queue's exact order
      service.playlist$.take(4).skip(3).subscribe((queue) => {
        expect(queue.list).toEqual(jasmine.arrayContaining([anyTrack, otherTrack]));
      });

      // partial matching because we can't know queue's exact order
      service.playlist$.skip(4).subscribe((queue) => {
        expect(queue.list).toEqual(jasmine.arrayContaining([anyTrack, otherTrack, track]));
      });

      service.shuffleCountSource$.takeLast(1).subscribe((count) => {
        expect(count).toEqual(0);
      });


      service.queueInControl(anyTrack);
      service.queueInControl(otherTrack);
      service.shuffleControlChange();
      service.queueInControl(track);

    })));

  it('checks method queueOutControl, no shuffle impact, empty list',
    async(inject([PlaylistControlService, ClassesStub], (service: PlaylistControlService, classes: ClassesStub) => {
      const track = classes.newTrack('mock');
      const emptyQueue = new CircularList([]);

      service.playlist$.subscribe((queue) => {
        expect(queue).toEqual(emptyQueue);
      });

      service.queueOutControl(track);

    })));

  it('checks method queueOutControl, no shuffle impact, non-empty list',
    async(inject([PlaylistControlService, ClassesStub], (service: PlaylistControlService, classes: ClassesStub) => {
      const track = classes.newTrack('mock');
      const emptyQueue = new CircularList([]);
      const queueInQueue = new CircularList([track]);

      service.playlist$.take(1).subscribe((queue) => {
        expect(queue).toEqual(emptyQueue);
      });

      service.playlist$.skip(1).take(1).subscribe((queue) => {
        expect(queue).toEqual(queueInQueue);
      });
      service.playlist$.skip(2).subscribe((queue) => {
        expect(queue).toEqual(emptyQueue);
      });


      service.queueInControl(track);
      service.queueOutControl(track);

    })));

  it('checks method queueOutControl, shuffle impact',
    async(inject([PlaylistControlService, ClassesStub], (service: PlaylistControlService, classes: ClassesStub) => {
      const anyTrack = classes.newTrack('mock');
      const otherTrack = classes.newTrack('other');
      const track = classes.newTrack('track');
      const emptyQueue = new CircularList([]);
      const queueInQueue = new CircularList([anyTrack, otherTrack, track]);

      service.playlist$.take(1).subscribe((queue) => {
        expect(queue).toEqual(emptyQueue);
      });

      // called when finished queueing in
      service.playlist$.skip(3).take(1).subscribe((queue) => {
        expect(queue).toEqual(queueInQueue);
      });

      // after shuffle : partial matching because we can't know queue's exact order
      service.playlist$.skip(4).take(1).subscribe((queue) => {
        expect(queue.list).toEqual(jasmine.arrayContaining([anyTrack, otherTrack, track]));
      });

      // partial matching because we can't know queue's exact order
      service.playlist$.skip(5).subscribe((queue) => {
        expect(queue.list).toEqual(jasmine.arrayContaining([anyTrack, otherTrack]));
      });

      service.shuffleCountSource$.takeLast(1).subscribe((count) => {
        expect(count).toEqual(0);
      });


      service.queueInControl(anyTrack);
      service.queueInControl(otherTrack);
      service.queueInControl(track);
      service.shuffleControlChange();
      service.queueOutControl(track);

    })));

  it('checks method getRepeatMode',
    inject([PlaylistControlService], (service: PlaylistControlService) => {
      const mode = 'mock';
      expect(service.getRepeatMode()).toBeUndefined();

      service.repeatModeControlChange(mode);

      expect(service.getRepeatMode()).toEqual(mode);
    }));

  it('checks method clearQueueControlChange, no shuffle impact',
    async(inject([PlaylistControlService, ClassesStub], (service: PlaylistControlService, classes: ClassesStub) => {
      const track = classes.newTrack('mock');
      const emptyQueue = new CircularList([]);
      const filledQueue = new CircularList([track]);

      service.playlist$.take(1).subscribe((queue) => {
        expect(queue).toEqual(emptyQueue);
      });

      service.playlist$.skip(1).take(1).subscribe((queue) => {
        expect(queue).toEqual(filledQueue);
      });

      service.playlist$.skip(2).subscribe((queue) => {
        expect(queue).toEqual(emptyQueue);
      });


      service.queueInControl(track);
      service.clearQueueControlChange();

    })));

  it('checks method clearQueueControlChange, shuffle impact',
    async(inject([PlaylistControlService, ClassesStub], (service: PlaylistControlService, classes: ClassesStub) => {
      const track = classes.newTrack('mock');
      const otherTrack = classes.newTrack('other');
      const emptyQueue = new CircularList([]);
      const filledQueue = new CircularList([track, otherTrack]);

      service.playlist$.take(1).subscribe((queue) => {
        expect(queue).toEqual(emptyQueue);
      });

      service.playlist$.skip(2).take(1).subscribe((queue) => {
        expect(queue).toEqual(filledQueue);
      });

      // partial matching because we can't know queue's exact order
      service.playlist$.skip(3).take(1).subscribe((queue) => {
        expect(queue.list).toEqual(jasmine.arrayContaining([track, otherTrack]));
      });

      service.playlist$.skip(4).subscribe((queue) => {
        expect(queue).toEqual(emptyQueue);
      });

      service.shuffleCountSource$.takeLast(1).subscribe((count) => {
        expect(count).toEqual(0);
      });

      service.queueInControl(track);
      service.queueInControl(otherTrack);
      service.shuffleControlChange();
      service.clearQueueControlChange();

    })));

  it('checks method repeatModeControlChange',
    inject([PlaylistControlService], (service: PlaylistControlService) => {
      const mode = 'mock';
      service.repeatModeControlChange(mode);

      expect(service.getRepeatMode()).toEqual(mode);
    }));

  it('checks method shuffleControlChange, queue too short to shuffle',
    async(inject([PlaylistControlService, ClassesStub], (service: PlaylistControlService, classes: ClassesStub) => {
      const track = classes.newTrack('mock');
      const empty = new CircularList();
      const tooShort = new CircularList([track]);

      service.playlist$.take(1).subscribe((queue) => {
        expect(queue).toEqual(empty);
      });

      service.shuffleCountSource$.take(1).subscribe((count) => {
        expect(count).toEqual(0);
      });

      // shuffle has no effect on shuffleCount
      service.shuffleCountSource$.skip(1).take(1).subscribe((count) => {
        expect(count).toEqual(0);
      });

      // called when finished queueing in. shuffle has no effect on list
      service.playlist$.skip(2).subscribe((queue) => {
        expect(queue).toEqual(tooShort);
      });

      // shuffle has no effect on shuffleCount
      service.shuffleCountSource$.skip(2).take(1).subscribe((count) => {
        expect(count).toEqual(0);
      });


      service.shuffleControlChange();
      service.queueInControl(track);
      service.shuffleControlChange();

    })));

  it('checks method shuffleControlChange, queue long enough to shuffle',
    async(inject([PlaylistControlService, ClassesStub], (service: PlaylistControlService, classes: ClassesStub) => {
      const track = classes.newTrack('mock');
      const otherTrack = classes.newTrack('other');
      const empty = new CircularList();
      const longEnough = new CircularList([track, otherTrack]);

      service.playlist$.take(1).subscribe((queue) => {
        expect(queue).toEqual(empty);
      });

      service.playlist$.skip(2).take(1).subscribe((queue) => {
        expect(queue).toEqual(longEnough);
      });

      service.shuffleCountSource$.take(1).subscribe((count) => {
        expect(count).toEqual(0);
      });

      // shuffleCount was incremented
      service.shuffleCountSource$.skip(1).take(1).subscribe((count) => {
        expect(count).toEqual(1);
      });

      // partial matching because we can't know queue's exact order
      service.playlist$.skip(3).subscribe((queue) => {
        expect(queue.list).toEqual(jasmine.arrayContaining([track, otherTrack]));
      });

      service.queueInControl(track);
      service.queueInControl(otherTrack);
      service.shuffleControlChange();

    })));

  it('checks method cancelShuffleControl, no shuffle before',
    async(inject([PlaylistControlService], (service: PlaylistControlService) => {
      const empty = new CircularList();

      // nothing happens to playlist
      service.playlist$.subscribe((queue) => {
        expect(queue).toEqual(empty);
      });

      service.shuffleCountSource$.subscribe((count) => {
        expect(count).toEqual(0);
      });

      service.cancelShuffleControl();
    })));

  it('checks method cancelShuffleControl, shuffle before',
    async(inject([PlaylistControlService, ClassesStub], (service: PlaylistControlService, classes: ClassesStub) => {
      const track = classes.newTrack('track');
      const otherTrack = classes.newTrack('other');
      const empty = new CircularList();
      const beforeShuffle = new CircularList([track, otherTrack]);

      // queue at start
      service.playlist$.take(1).subscribe((queue) => {
        expect(queue).toEqual(empty);
      });

      // shuffle count at start
      service.shuffleCountSource$.take(1).subscribe((count) => {
        expect(count).toEqual(0);
      });

      // queue after queueing in all tracks
      service.playlist$.skip(2).take(1).subscribe((queue) => {
        expect(queue).toEqual(beforeShuffle);
      });

      // partial matching because we can't know queue's exact order
      service.playlist$.skip(3).take(1).subscribe((queue) => {
        expect(queue.list).toEqual(jasmine.arrayContaining([track, otherTrack]));
      });

      // shuffle count incremented after shuffle
      service.shuffleCountSource$.skip(1).take(1).subscribe((count) => {
        expect(count).toEqual(1);
      });

      // queue reset to state before shuffle
      service.playlist$.skip(4).subscribe((queue) => {
        expect(queue).toEqual(beforeShuffle);
      });

      // shuffle count reset after cancel
      service.shuffleCountSource$.skip(2).subscribe((count) => {
        expect(count).toEqual(0);
      });

      service.queueInControl(track);
      service.queueInControl(otherTrack);
      service.shuffleControlChange();
      service.cancelShuffleControl();
    })));

  it('checks method saveQueueControlChange',
    inject([PlaylistControlService], (service: PlaylistControlService) => {
      service.saveQueueControl$.subscribe(() => {

      });

      service.saveQueueControlChange();
    }));



});
