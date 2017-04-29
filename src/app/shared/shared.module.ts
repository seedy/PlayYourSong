import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// 3rd-party dependencies imports
import 'hammerjs';
import { MaterialModule } from '../material/material.module';

import { MultistateButtonComponent } from './components/multistate-button/multistate-button.component';
import { ErrorMessageListComponent } from './components/error-message-list/error-message-list.component';

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
    ErrorMessageListComponent
  ]
})
export class SharedModule { }
