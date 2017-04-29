import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MdAutocompleteModule, MdButtonModule, MdCardModule, MdCheckboxModule,
  MdChipsModule, MdDialogModule, MdIconModule, MdInputModule, MdLineModule, MdListModule,
  MdMenuModule, MdOptionModule, MdRadioModule, MdSelectModule,
  MdSidenavModule, MdSliderModule, MdGridListModule, MdProgressSpinnerModule, MdTooltipModule,
  MdToolbarModule, MdProgressBarModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdAutocompleteModule, MdButtonModule, MdCardModule, MdCheckboxModule,
    MdChipsModule, MdDialogModule, MdIconModule, MdInputModule, MdLineModule, MdListModule,
    MdMenuModule, MdOptionModule, MdRadioModule, MdSelectModule,
    MdSidenavModule, MdSliderModule, MdGridListModule, MdProgressSpinnerModule, MdTooltipModule,
    MdToolbarModule
  ],
  exports: [
    MdAutocompleteModule, MdButtonModule, MdCardModule, MdCheckboxModule,
    MdChipsModule, MdDialogModule, MdIconModule, MdInputModule, MdLineModule, MdListModule,
    MdMenuModule, MdOptionModule, MdRadioModule, MdSelectModule, MdProgressBarModule,
    MdSidenavModule, MdSliderModule, MdGridListModule, MdProgressSpinnerModule, MdTooltipModule,
    MdToolbarModule
  ],
  declarations: []
})
export class MaterialModule { }
