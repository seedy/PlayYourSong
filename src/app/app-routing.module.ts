import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from './core/components/page-not-found/page-not-found.component';
import {HomeComponent} from './core/components/home/home.component';
import {WelcomeBarComponent} from './core/components/welcome-bar/welcome-bar.component';
import {RegisterComponent} from './core/components/register/register.component';
import {LoginComponent} from './core/components/login/login.component';
import {ResultListComponent} from './core/components/result-list/result-list.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: WelcomeBarComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'search',
        component: ResultListComponent
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
