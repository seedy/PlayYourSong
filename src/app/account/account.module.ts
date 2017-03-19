import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AccountRoutingModule} from './account-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule
  ],
  declarations: [RegisterComponent, LoginComponent]
})
export class AccountModule { }
