import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';

  // 3rd-party dependencies imports
  import 'hammerjs';
  import 'rxjs/add/operator/debounceTime';
  import 'rxjs/add/operator/map';
  import { Http, RequestOptions } from '@angular/http';
  import { AuthHttp, AuthConfig } from 'angular2-jwt';


/*****************
 * LOCAL IMPORTS *
 *****************/
// guards
import { throwIfAlreadyLoaded } from './module-import-guard';

// interfaces
import {APP_CONFIG, PYS_CONFIG} from './app-config';

// modules
import { MaterialModule } from '../material/material.module';
import {PlayerModule} from '../player/player.module';

// components
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { WelcomeBarComponent } from './components/welcome-bar/welcome-bar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TracknavComponent } from './components/tracknav/tracknav.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PlayerModule,
    SharedModule,
    MaterialModule
  ],
  exports: [],
  declarations: [
    LoadingSpinnerComponent,
    PageNotFoundComponent,
    HomeComponent,
    WelcomeBarComponent,
    NavbarComponent,
    TracknavComponent,
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    {
      provide: APP_CONFIG,
      useValue: PYS_CONFIG
    }
  ]
})

export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}