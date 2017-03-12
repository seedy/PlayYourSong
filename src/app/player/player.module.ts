import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// 3rd-party dependencies imports
import 'hammerjs';
import { MaterialModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';

import { PlayerMenuComponent } from './components/player-menu/player-menu.component';
import {PlaylistComponent} from "./components/playlist/playlist.component";
import {TrackComponent} from "./components/track/track.component";
import { RepeatButtonComponent } from './components/repeat-button/repeat-button.component';
import { ShuffleButtonComponent } from './components/shuffle-button/shuffle-button.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule
  ],
  declarations: [
    PlayerMenuComponent,
    PlaylistComponent,
    TrackComponent,
    RepeatButtonComponent,
    ShuffleButtonComponent
  ],
  exports: [
    PlayerMenuComponent,
    PlaylistComponent,
    TrackComponent,
    RepeatButtonComponent
  ]
})
export class PlayerModule { }
