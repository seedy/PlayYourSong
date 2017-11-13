import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {LoginService} from '../../../shared/services/login/login.service';
import {SearchHelperService} from '../../services/searchHelper/searchHelper.service';
import {Searchable} from '../../../shared/classes/searchable';

@Component({
  selector: 'pys-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  search = '';
  activeServices: Searchable[] = [];
  services: Searchable[] = [];

  constructor(private router: Router, private loginService: LoginService, private searchHelper: SearchHelperService) {
  }

  ngOnInit() {
    this.initLoggedIn();
    this.initSearchServices();
  }

  public onChange(): void {
    this.searchHelper.activateServices(this.activeServices.map((service) => service.name));
  }

  public query(): void {
    this.router.navigate(['/search']);
    this.searchHelper.query(this.search);
  }

  public checkToken(): void {
    this.loginService.checkToken().subscribe((result) => result);
  }

  public logout(): void {
    this.loginService.logout();
  }

  private initLoggedIn(): void {
    // behaviour subject
    this.loginService.isLoggedIn$.subscribe(
      status => {
        this.isLoggedIn = status;
      }
    );
  }

  private initSearchServices(): void {
    this.services = this.searchHelper.getServices();
    this.activeServices = this.services.filter( (service) => service.active);
  }

}
