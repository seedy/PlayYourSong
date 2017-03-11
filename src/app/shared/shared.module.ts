import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// 3rd-party dependencies imports
import 'hammerjs';
import { MaterialModule } from '@angular/material';

import { MultistateButtonComponent } from './components/multistate-button/multistate-button.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    MultistateButtonComponent,
  ],
  exports: [
    CommonModule,
    MultistateButtonComponent,
  ]
})
export class SharedModule { }
