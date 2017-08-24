import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// 3rd-party dependencies imports
import 'hammerjs';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

// local imports
import { PlayerMenuComponent } from './components/player-menu/player-menu.component';
import {PlaylistComponent} from "./components/playlist/playlist.component";
import {TrackComponent} from "./components/track/track.component";
import { RepeatButtonComponent } from './components/repeat-button/repeat-button.component';
import { ShuffleButtonComponent } from './components/shuffle-button/shuffle-button.component';
import { ClearButtonComponent } from './components/clear-button/clear-button.component';
import { SaveButtonComponent } from './components/save-button/save-button.component';

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
    ShuffleButtonComponent,
    ClearButtonComponent,
    SaveButtonComponent
  ],
  exports: [
    PlayerMenuComponent,
    PlaylistComponent,
    TrackComponent,
    RepeatButtonComponent
  ]
})
export class PlayerModule { }
