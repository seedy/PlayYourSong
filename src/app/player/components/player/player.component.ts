import {
  AfterContentInit, Component, ComponentFactoryResolver, OnDestroy,
  ViewChild
} from '@angular/core';
import {PlayerHostDirective} from '../../player-host/player-host.directive';
import {Player} from '../../../shared/interfaces/player';
import {Track} from '../../../shared/classes/track';

import {PlayerSelectorService} from '../../services/player-selector.service';

@Component({
  selector: 'pys-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements AfterContentInit, OnDestroy {

  // TODO : choose how to receive and propagate current track info
  track = new Track('', '', '', 'xYC_78PUrZg');
  @ViewChild(PlayerHostDirective) playerHost: PlayerHostDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private playerSelectorService: PlayerSelectorService
  ) { }

  ngAfterContentInit() {
    this.loadPlayer();
  }

  ngOnDestroy() {
    this.destroyPlayer();
  }

  loadPlayer(): void {
    // TODO : define component as a variable computed from the track data
    // youtube special case

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.playerSelectorService.getComponentFactory('youtube'));

    let viewContainerRef = this.playerHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);

    (<Player>componentRef.instance).track = this.track;
  }

  destroyPlayer(): void {

  }


}
