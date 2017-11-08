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


@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    MultistateButtonComponent,
    ErrorMessageListComponent,
  ],
  exports: [
    CommonModule,
    MultistateButtonComponent,
    ErrorMessageListComponent,
  ],
  providers: [
    ErrorMessageService
  ]
})
export class SharedModule { }
