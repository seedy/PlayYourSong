import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Account } from '../../classes/account';
import {ErrorMessageService} from "../../../shared/services/error-message/error-message.service";

@Component({
  selector: 'pys-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [ErrorMessageService]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  usernameProgress: string;
  errorMessages: {};
  constructor(private fb: FormBuilder, private errorMessageService: ErrorMessageService) {
  }

  ngOnInit() {
    this.errorMessages = {};
    this.usernameProgress = 'determinate';
    this.createForm();
  }

  register(): void {
    // http request with form data
  }

  clean(): void {
    this.registerForm.reset();
  }

  private createForm(): void {
    this.registerForm = this.fb.group({
      username: ['', [
          Validators.required
        ]
      ],
      email: ['', [
          Validators.required,
          Validators.pattern(Account.emailRegexp())
        ]
      ],
      password: ['', [
          Validators.required,
          Validators.minLength(8)
        ]
      ],
      terms: [false, [
          Validators.requiredTrue
        ]
      ]
    });

    this.registerForm.valueChanges
      .debounceTime(400)
      .subscribe(data => this.onFormValueChanged(data));
  }

  private onFormValueChanged(data): void {
    const form = this.registerForm;
    if (!form) {
      return;
    }
    this.errorMessages = this.errorMessageService.mapErrorMessages(form, data);
  }
}
