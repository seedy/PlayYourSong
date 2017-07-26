import {Component, OnInit} from '@angular/core';
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

  constructor(public loginService: LoginService, public searchHelper: SearchHelperService) {
  }

  ngOnInit() {
    this.initLoggedIn();
    this.initSearchServices();
  }

  onChange(): void {
    this.services.forEach( (service) => service.active = this.activeServices.some( (active) => service.id === active.id ));
  }

  query(): void {
    this.searchHelper.query(this.search);
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

  private initSearchServices(): void {
    this.services = this.searchHelper.getServices();
    this.activeServices = this.services.filter( (service) => service.active);
  }

}
