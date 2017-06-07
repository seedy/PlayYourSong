import {Component, OnInit, Output, EventEmitter, AfterViewInit} from '@angular/core';
import {LoginService} from '../../../shared/services/login/login.service';

@Component({
  selector: 'pys-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  search = '';
  constructor(public loginService: LoginService) {
  }

  ngOnInit() {
    this.initLoggedIn();
  }

  checkToken(): void {
    this.loginService.checkToken().subscribe((result) => console.log(result));
  }

  logout(): void {
    this.loginService.logout();
  }

  private initLoggedIn(): void {
    this.isLoggedIn = this.loginService.isLoggedIn();
    this.loginService.isLoggedIn$.subscribe(
      status => {
        this.isLoggedIn = status;
      }
    );
  }
}
