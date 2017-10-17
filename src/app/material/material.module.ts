import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule,
  MatChipsModule, MatDialogModule, MatIconModule, MatInputModule, MatLineModule, MatListModule,
  MatMenuModule, MatOptionModule, MatRadioModule, MatSelectModule,
  MatSidenavModule, MatSliderModule, MatGridListModule, MatProgressSpinnerModule, MatTooltipModule,
  MatToolbarModule, MatProgressBarModule, MatSnackBarModule, MatTabsModule, MatPaginatorModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule,
    MatChipsModule, MatDialogModule, MatIconModule, MatInputModule, MatLineModule, MatListModule,
    MatMenuModule, MatOptionModule, MatRadioModule, MatSelectModule,
    MatSidenavModule, MatSliderModule, MatGridListModule, MatProgressSpinnerModule, MatTooltipModule,
    MatToolbarModule, MatProgressBarModule, MatSnackBarModule, MatTabsModule, MatPaginatorModule
  ],
  exports: [
    MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule,
    MatChipsModule, MatDialogModule, MatIconModule, MatInputModule, MatLineModule, MatListModule,
    MatMenuModule, MatOptionModule, MatRadioModule, MatSelectModule,
    MatSidenavModule, MatSliderModule, MatGridListModule, MatProgressSpinnerModule, MatTooltipModule,
    MatToolbarModule, MatProgressBarModule, MatSnackBarModule, MatTabsModule, MatPaginatorModule
  ],
  declarations: []
})
export class MaterialModule { }
