import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MdAutocompleteModule, MdButtonModule, MdCardModule, MdCheckboxModule,
  MdChipsModule, MdDialogModule, MdIconModule, MdInputModule, MdLineModule, MdListModule,
  MdMenuModule, MdOptionModule, MdRadioModule, MdSelectModule,
  MdSidenavModule, MdSliderModule, MdGridListModule, MdProgressSpinnerModule, MdTooltipModule,
  MdToolbarModule, MdProgressBarModule, MdSnackBarModule, MdTabsModule, MdPaginatorModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdAutocompleteModule, MdButtonModule, MdCardModule, MdCheckboxModule,
    MdChipsModule, MdDialogModule, MdIconModule, MdInputModule, MdLineModule, MdListModule,
    MdMenuModule, MdOptionModule, MdRadioModule, MdSelectModule,
    MdSidenavModule, MdSliderModule, MdGridListModule, MdProgressSpinnerModule, MdTooltipModule,
    MdToolbarModule, MdProgressBarModule, MdSnackBarModule, MdTabsModule, MdPaginatorModule
  ],
  exports: [
    MdAutocompleteModule, MdButtonModule, MdCardModule, MdCheckboxModule,
    MdChipsModule, MdDialogModule, MdIconModule, MdInputModule, MdLineModule, MdListModule,
    MdMenuModule, MdOptionModule, MdRadioModule, MdSelectModule,
    MdSidenavModule, MdSliderModule, MdGridListModule, MdProgressSpinnerModule, MdTooltipModule,
    MdToolbarModule, MdProgressBarModule, MdSnackBarModule, MdTabsModule, MdPaginatorModule
  ],
  declarations: []
})
export class MaterialModule { }
