import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../services/login/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'pys-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public loginService: LoginService, public router: Router) { }

  ngOnInit() {
  }

}
