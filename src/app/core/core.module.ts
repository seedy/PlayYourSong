import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';

// 3rd-party dependencies imports
import 'hammerjs';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import { FlexLayoutModule } from '@angular/flex-layout';

/*****************
 * LOCAL IMPORTS *
 *****************/
// guards
import { throwIfAlreadyLoaded } from './module-import-guard';

// providers
import {pysConfigProvider} from './config/pysConfig';
import {pysRequestOptionsProvider} from './config/pysHttpRequestOptions';
import {pysAuthHttpFactoryProvider} from './config/pysAuthHttp.service';

// services
import {LoginService} from '../shared/services/login/login.service';
import {StorageService} from '../shared/services/storage/storage.service';
import {SearchHelperService} from './services/searchHelper/searchHelper.service';

// modules
import { MaterialModule } from '../material/material.module';
import {PlayerModule} from '../player/player.module';
import {SharedModule} from '../shared/shared.module';
import {YoutubeModule} from '../youtube/youtube.module';

// components
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { WelcomeBarComponent } from './components/welcome-bar/welcome-bar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TracknavComponent } from './components/tracknav/tracknav.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import { ResultListComponent } from './components/result-list/result-list.component';
import {ResultHelperService} from './services/resultHelper/result-helper.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    PlayerModule,
    YoutubeModule,
    SharedModule
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
    RegisterComponent,
    ResultListComponent
  ],
  providers: [
    pysConfigProvider,
    pysRequestOptionsProvider,
    pysAuthHttpFactoryProvider,
    LoginService,
    SearchHelperService,
    ResultHelperService,
    StorageService
  ]
})

export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
