import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {LoginService} from "../../services/login/login.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor (private loginService: LoginService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const isAuth = this.checkLogin();

    return isAuth ? true : this.doRedirect(state.url);

  }

  private checkLogin(): boolean {
    return this.loginService.isLoggedIn();
  }

  private doRedirect(attemptedUrl) {
    this.loginService.redirectUrl = attemptedUrl;

    this.router.navigate(['/login']);
    return false;
  }

}
