import {async, ComponentFixture, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/skip';

import { RegisterComponent } from './register.component';
import {MaterialModule} from '../../../material/material.module';
import {ComponentsStub} from '../../../../testing/components-stub';
import {ErrorMessageService} from '../../../shared/services/error-message/error-message.service';
import {LoginService} from '../../../shared/services/login/login.service';
import {RouterStub} from '../../../../testing/router-stub';
import {Account} from '../../../shared/classes/account';

fdescribe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let errorMessageListStub, errorMessageServiceStub, loginServiceStub;

  beforeEach(async(() => {
    errorMessageListStub = ComponentsStub.mockComponent({
      selector: 'pys-error-message-list',
      inputs: ['errorMessages']
    });
    errorMessageServiceStub = jasmine.createSpyObj('errorMessageService', ['mapErrorMessages']);
    loginServiceStub = jasmine.createSpyObj('loginService', ['register']);

    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      declarations: [
        RegisterComponent,
        errorMessageListStub
      ],
      providers: [
        {provide: ErrorMessageService, useValue: errorMessageServiceStub},
        {provide: LoginService, useValue: loginServiceStub},
        {provide: Router, useClass: RouterStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    spyOn(component, 'ngOnInit').and.callThrough();
    fixture.detectChanges();
  });

  it('checks component public api, construction and lifecycle', () => {
    expect(component).toBeTruthy();
    expect(component.ngOnInit).toHaveBeenCalled();
    expect(component.errorMessages).toEqual({});
    expect(component.usernameProgress).toEqual('determinate');
    expect(component.registerForm).toEqual(jasmine.any(FormGroup));
    expect(component.registerForm.controls).toEqual(jasmine.objectContaining({
      username: jasmine.any(FormControl),
      email: jasmine.any(FormControl),
      password: jasmine.any(FormControl),
      terms: jasmine.any(FormControl),
    }));
    expect(component.register).toEqual(jasmine.any(Function));
    expect(component.clean).toEqual(jasmine.any(Function));
  });

  it('checks method register, response true',
    inject([LoginService, Router], (login: LoginService, router: Router) => {
      const email = 'mock@gmail.com';
      const username = 'mock';
      const pass = 'pizza';
      const expectedCreds = new Account(pass, username, email);
      component.registerForm.value.email = email;
      component.registerForm.value.username = username;
      component.registerForm.value.password = pass;

      (login.register as jasmine.Spy).and.returnValue(Observable.of(true));

      component.register();

      expect(login.register as jasmine.Spy).toHaveBeenCalledWith(expectedCreds);
      expect(router.navigate as jasmine.Spy).toHaveBeenCalledWith(['']);
    }));

  it('checks method register, response false',
    inject([LoginService, Router], (login: LoginService, router: Router) => {
      const email = 'mock@gmail.com';
      const username = 'mock';
      const pass = 'pizza';
      const expectedCreds = new Account(pass, username, email);
      component.registerForm.value.email = email;
      component.registerForm.value.username = username;
      component.registerForm.value.password = pass;

      (login.register as jasmine.Spy).and.returnValue(Observable.of(false));

      component.register();

      expect(login.register as jasmine.Spy).toHaveBeenCalledWith(expectedCreds);
      expect(router.navigate as jasmine.Spy).not.toHaveBeenCalled();
    }));

  it('checks method clean', () => {
    const username = 'toto';
    component.registerForm.get('username').setValue(username);
    component.registerForm.markAsDirty();
    expect(component.registerForm.dirty).toEqual(true);

    component.clean();

    expect(component.registerForm.dirty).toEqual(false);
    expect(component.registerForm.value.username).toBeNull();

  });

  it('checks form behaviour',
    fakeAsync(inject([ErrorMessageService], (errorMsg: ErrorMessageService) => {
      const terms = true;
      const initFormData = {
        username: '',
        email: '',
        password: '',
        terms: false
      };
      const formData = {
        username: '',
        email: '',
        password: '',
        terms: true
      };
      const error = {password: ['field is required']};

      component.registerForm.valueChanges
        .take(1)
        .subscribe((init) => {
          expect(init).toEqual(initFormData);
          expect(errorMsg.mapErrorMessages as jasmine.Spy).not.toHaveBeenCalled();
        });

      component.registerForm.valueChanges
        .skip(1)
        .subscribe((data) => {
          expect(data).toEqual(formData);
          expect(errorMsg.mapErrorMessages as jasmine.Spy).not.toHaveBeenCalled();
        });

      component.registerForm.get('terms').updateValueAndValidity({ onlySelf: false, emitEvent: true });
      component.registerForm.get('terms').setValue(true);

      (errorMsg.mapErrorMessages as jasmine.Spy).and.returnValue(error);

      tick(400);

      expect(errorMsg.mapErrorMessages as jasmine.Spy).toHaveBeenCalledWith(component.registerForm, formData);
      expect(component.errorMessages).toEqual(error);
    })));

  it('checks bindings with component pys-error-message-list', () => {
    const errorMessageListEls = fixture.debugElement.queryAll(By.css('pys-error-message-list'));
    expect(errorMessageListEls.length).toEqual(4);
    errorMessageListEls.forEach((el) => {
      expect(el.componentInstance).toBeDefined();
    });
    expect(errorMessageListEls[0].componentInstance.errorMessages).toEqual(component.errorMessages['username']);
    expect(errorMessageListEls[1].componentInstance.errorMessages).toEqual(component.errorMessages['email']);
    expect(errorMessageListEls[2].componentInstance.errorMessages).toEqual(component.errorMessages['password']);
    expect(errorMessageListEls[3].componentInstance.errorMessages).toEqual(component.errorMessages['terms']);

    component.errorMessages['username'] = ['username is required'];
    component.errorMessages['email'] = ['email is required'];
    component.errorMessages['password'] = ['password is too short'];
    component.errorMessages['terms'] = ['terms is required to be ticked'];

    fixture.detectChanges();

    expect(errorMessageListEls[0].componentInstance.errorMessages).toEqual(component.errorMessages['username']);
    expect(errorMessageListEls[1].componentInstance.errorMessages).toEqual(component.errorMessages['email']);
    expect(errorMessageListEls[2].componentInstance.errorMessages).toEqual(component.errorMessages['password']);
    expect(errorMessageListEls[3].componentInstance.errorMessages).toEqual(component.errorMessages['terms']);
  });

});
