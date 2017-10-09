import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// 3rd-party dependencies imports
import 'hammerjs';
import { MaterialModule } from '../material/material.module';

// components
import { MultistateButtonComponent } from './components/multistate-button/multistate-button.component';
import { ErrorMessageListComponent } from './components/error-message-list/error-message-list.component';

// services
import {ErrorMessageService} from './services/error-message/error-message.service';

// pipes
import { UrlSafePipe } from './pipes/url-safe.pipe';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    MultistateButtonComponent,
    ErrorMessageListComponent,
    UrlSafePipe,
  ],
  exports: [
    CommonModule,
    MultistateButtonComponent,
    ErrorMessageListComponent,
    UrlSafePipe
  ],
  providers: [
    ErrorMessageService
  ]
})
export class SharedModule { }
