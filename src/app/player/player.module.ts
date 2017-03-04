import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// 3rd-party dependencies imports
import 'hammerjs';
import { MaterialModule } from '@angular/material';

import { PlayerMenuComponent } from './components/player-menu/player-menu.component';
import {PlaylistComponent} from "./components/playlist/playlist.component";
import {TrackComponent} from "./components/track/track.component";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    PlayerMenuComponent,
    PlaylistComponent,
    TrackComponent
  ],
  exports: [
    PlayerMenuComponent,
    PlaylistComponent,
    TrackComponent
  ]
})
export class PlayerModule { }
