import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import { ErrorMessageService } from '../../../shared/services/error-message/error-message.service';
import {Account} from "../../../shared/classes/account";
import {LoginService} from '../../../shared/services/login/login.service';

@Component({
  selector: 'pys-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
  providers: [ErrorMessageService, LoginService]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessages: {};
  constructor(private fb: FormBuilder, private errorMessageService: ErrorMessageService, private loginService: LoginService) { }

  ngOnInit() {
    this.errorMessages = {};
    this.createForm();
  }

  login(): void {
    // http request with form data
    const credentials = {
      identifier: this.loginForm.value.identifier,
      password: this.loginForm.value.password
    };
    this.loginService.login(credentials).subscribe((result) => {
      if (result) {
        console.log("OK");
      }
    });
  }

  private createForm(): void {
    this.loginForm = this.fb.group({
      identifier: ['', [
          Validators.required,
          Validators.pattern(Account.usernameOrEmailRegexp())
        ]
      ],
      password: ['', [
          Validators.required
        ]
      ]
    });

    this.loginForm.valueChanges
      .debounceTime(400)
      .subscribe(data => this.onFormValueChanged(data));
  }

  private onFormValueChanged(data): void {
    const form = this.loginForm;
    if (!form) {
      return;
    }
    this.errorMessages = this.errorMessageService.mapErrorMessages(form, data);
  }

}
