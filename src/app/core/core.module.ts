import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';

  // 3rd-party dependencies imports
  import 'hammerjs';
  import 'rxjs/add/operator/debounceTime';
  import 'rxjs/add/operator/map';


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
import {AccountService} from '../shared/services/account/account.service';
import {StorageService} from '../shared/services/storage/storage.service';

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
    pysConfigProvider,
    pysRequestOptionsProvider,
    pysAuthHttpFactoryProvider,
    LoginService,
    AccountService,
    StorageService
  ]
})

export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
