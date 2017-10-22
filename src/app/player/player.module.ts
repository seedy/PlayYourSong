import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';

// 3rd-party dependencies imports
import 'hammerjs';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

// local imports
import { PlayerMenuComponent } from './components/player-menu/player-menu.component';
import {PlaylistComponent} from './components/playlist/playlist.component';
import {TrackComponent} from './components/track/track.component';
import { RepeatButtonComponent } from './components/repeat-button/repeat-button.component';
import { ShuffleButtonComponent } from './components/shuffle-button/shuffle-button.component';
import { ClearButtonComponent } from './components/clear-button/clear-button.component';
import { SaveButtonComponent } from './components/save-button/save-button.component';
import { PlayerHostDirective } from './player-host/player-host.directive';
import { PlayerComponent } from './components/player/player.component';

import {YoutubePlayerInstanceComponent} from '../youtube/components/youtube-player-instance/youtube-player-instance.component';
import {PlayerSelectorService} from './services/player-selector.service';
import {PlaylistControlService} from '../shared/services/playlist-control/playlist-control.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule
  ],
  declarations: [
    PlayerMenuComponent,
    PlaylistComponent,
    TrackComponent,
    RepeatButtonComponent,
    ShuffleButtonComponent,
    ClearButtonComponent,
    SaveButtonComponent,
    PlayerHostDirective,
    PlayerComponent
  ],
  exports: [
    PlayerMenuComponent,
    PlaylistComponent,
    TrackComponent,
    RepeatButtonComponent
  ],
  providers: [
    PlayerSelectorService,
    PlaylistControlService
  ],
  entryComponents: [
    YoutubePlayerInstanceComponent
  ]
})
export class PlayerModule { }
