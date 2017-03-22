import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/map";

import { ErrorMessageService } from '../../../shared/services/error-message/error-message.service';
import {Account} from "../../classes/account";

@Component({
  selector: 'pys-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ErrorMessageService]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessages: {};
  constructor(private fb: FormBuilder, private errorMessageService: ErrorMessageService) { }

  ngOnInit() {
    this.errorMessages = {};
    this.createForm();
  }

  login(): void {
    // http request with form data
  }

  private createForm(): void {
    this.loginForm = this.fb.group({
      identifier: ['', [
          Validators.required,
          Validators.pattern(Account.usernameOrEmailRegexp())
        ]
      ],
      password: ['', [
          Validators.required,
          Validators.minLength(8)
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
