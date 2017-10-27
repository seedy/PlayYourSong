import {
  AfterContentInit, Component, ComponentFactoryResolver, ComponentRef, OnDestroy,
  ViewChild
} from '@angular/core';
import {PlayerHostDirective} from '../../player-host/player-host.directive';
import {Player} from '../../../shared/interfaces/player';
import {Track} from '../../../shared/classes/track';

import {PlayerSelectorService} from '../../services/player-selector.service';
import {PlaylistControlService} from '../../../shared/services/playlist-control/playlist-control.service';
import {CircularList} from '../../../shared/classes/circular-list';

@Component({
  selector: 'pys-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements AfterContentInit, OnDestroy {

  track: Track;
  @ViewChild(PlayerHostDirective) playerHost: PlayerHostDirective;

  private componentRef: ComponentRef<any>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private playerSelectorService: PlayerSelectorService,
    private playlistControlService: PlaylistControlService
  ) { }

  ngAfterContentInit() {
    this.playlistControlService.playlist$.subscribe((newList: CircularList<Track>) => this.playTrack(newList));
  }

  ngOnDestroy() {
    this.destroyPlayer();
  }

  public playTrack(list: CircularList<Track>): void {
    const track = list.getSelected();
    if (this.track === track) {
      return;
    }
    this.loadPlayer(track);
  }

  private loadPlayer(track: Track): void {
    if (!this.componentRef || !this.track || !track || track.origin !== this.track.origin) {
      const viewContainerRef = this.playerHost.viewContainerRef;
      viewContainerRef.clear();

      if (track) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
          this.playerSelectorService.getComponentFactory(track.origin)
        );

        this.componentRef = viewContainerRef.createComponent(componentFactory);
      }
    }

    const oldTrack = (<Player>this.componentRef.instance).track;
    (<Player>this.componentRef.instance).track = this.track = track;
    (<Player>this.componentRef.instance).onManualTrackChange(oldTrack, this.track);
  }

  private destroyPlayer(): void {

  }


}
