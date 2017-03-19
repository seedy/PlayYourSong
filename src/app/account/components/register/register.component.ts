import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Account } from '../../classes/account';

@Component({
  selector: 'pys-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  usernameProgress: string;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.createForm();
    this.usernameProgress = 'determinate';
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
  }

}
