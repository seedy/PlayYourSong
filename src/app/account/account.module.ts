import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// 3rd-party dependencies imports
import 'hammerjs';
import { MaterialModule } from '@angular/material';

import {AccountRoutingModule} from './account-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    AccountRoutingModule
  ],
  declarations: [RegisterComponent, LoginComponent]
})
export class AccountModule { }
