import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// 3rd-party dependencies imports
import 'hammerjs';
import { MaterialModule } from '@angular/material';

// local imports
import { throwIfAlreadyLoaded } from './module-import-guard';

// components
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { WelcomeBarComponent } from './components/welcome-bar/welcome-bar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TracknavComponent } from './components/tracknav/tracknav.component';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  exports: [],
  declarations: [
    LoadingSpinnerComponent,
    PageNotFoundComponent,
    HomeComponent,
    WelcomeBarComponent,
    NavbarComponent,
    TracknavComponent
  ],
  providers: []
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
