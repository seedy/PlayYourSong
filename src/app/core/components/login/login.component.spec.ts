import {async, ComponentFixture, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/skip';

import { LoginComponent } from './login.component';
import {MaterialModule} from '../../../material/material.module';
import {LoginService} from '../../../shared/services/login/login.service';
import {ErrorMessageService} from '../../../shared/services/error-message/error-message.service';
import {ComponentsStub} from '../../../../testing/components-stub';
import {RouterStub} from '../../../../testing/router-stub';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Credentials} from '../../../shared/classes/credentials';
import {By} from '@angular/platform-browser';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let errorMessageListStub, errorMessageServiceStub, loginServiceStub;

  beforeEach(async(() => {
    errorMessageListStub = ComponentsStub.mockComponent({
      selector: 'pys-error-message-list',
      inputs: ['errorMessages']
    });
    errorMessageServiceStub = jasmine.createSpyObj('errorMessageService', ['mapErrorMessages']);
    loginServiceStub = jasmine.createSpyObj('loginService', ['login']);

    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      declarations: [
        LoginComponent,
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
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    spyOn(component, 'ngOnInit').and.callThrough();
    fixture.detectChanges();
  });

  it('checks component public api, construction and lifecycle', () => {
    expect(component).toBeTruthy();
    expect(component.ngOnInit).toEqual(jasmine.any(Function));
    expect(component.ngOnInit as jasmine.Spy).toHaveBeenCalled();
    expect(component.loginForm).toEqual(jasmine.any(FormGroup));
    expect(component.loginForm.controls).toEqual(jasmine.objectContaining({
      identifier: jasmine.any(FormControl),
      password: jasmine.any(FormControl)
  }));
    expect(component.errorMessages).toEqual({});
    expect(component.login).toEqual(jasmine.any(Function));
  });

  it('checks method login, login true',
    inject([LoginService, Router], (login: LoginService, router: Router) => {
      const id = 'mock';
      const pass = 'pass';
      component.loginForm.value.identifier = id;
      component.loginForm.value.password = pass;
      const expectedCreds = new Credentials(id, pass);

      (login.login as jasmine.Spy).and.returnValue(Observable.of(true));

      component.login();

      expect(login.login as jasmine.Spy).toHaveBeenCalledWith(expectedCreds);
      expect(router.navigate as jasmine.Spy).toHaveBeenCalledWith(['']);
    }));

  it('checks method login, login false',
    inject([LoginService, Router], (login: LoginService, router: Router) => {
      const id = 'mock';
      const pass = 'pass';
      component.loginForm.value.identifier = id;
      component.loginForm.value.password = pass;
      const expectedCreds = new Credentials(id, pass);

      (login.login as jasmine.Spy).and.returnValue(Observable.of(false));

      component.login();

      expect(login.login as jasmine.Spy).toHaveBeenCalledWith(expectedCreds);
      expect(router.navigate as jasmine.Spy).not.toHaveBeenCalled();
    }));

  it('checks form behaviour',
    fakeAsync(inject([ErrorMessageService], (errorMsg: ErrorMessageService) => {
      const id = 'new id';
      const initFormData = {
        identifier: '',
        password: ''
      };
      const formData = {
        identifier: id,
        password: ''
      };
      const error = {identifier: ['field is required']};

      component.loginForm.valueChanges
        .take(1)
        .subscribe((init) => {
          expect(init).toEqual(initFormData);
          expect(errorMsg.mapErrorMessages as jasmine.Spy).not.toHaveBeenCalled();
        });

      component.loginForm.valueChanges
        .skip(1)
        .subscribe((data) => {
          expect(data).toEqual(formData);
          expect(errorMsg.mapErrorMessages as jasmine.Spy).not.toHaveBeenCalled();
        });

      component.loginForm.get('identifier').updateValueAndValidity({ onlySelf: false, emitEvent: true });
      component.loginForm.get('identifier').setValue(id);

      (errorMsg.mapErrorMessages as jasmine.Spy).and.returnValue(error);

      tick(400);

      expect(errorMsg.mapErrorMessages as jasmine.Spy).toHaveBeenCalledWith(component.loginForm, formData);
      expect(component.errorMessages).toEqual(error);
  })));

  it('checks bindings with component pys-error-message-list', () => {
    const errorMessageListEls = fixture.debugElement.queryAll(By.css('pys-error-message-list'));
    expect(errorMessageListEls.length).toEqual(2);
    errorMessageListEls.forEach((el) => {
      expect(el.componentInstance).toBeDefined();
    });
    expect(errorMessageListEls[0].componentInstance.errorMessages).toEqual(component.errorMessages['identifier']);
    expect(errorMessageListEls[1].componentInstance.errorMessages).toEqual(component.errorMessages['password']);

    component.errorMessages['identifier'] = ['identifier is required'];
    component.errorMessages['password'] = ['password is too short'];

    fixture.detectChanges();

    expect(errorMessageListEls[0].componentInstance.errorMessages).toEqual(component.errorMessages['identifier']);
    expect(errorMessageListEls[1].componentInstance.errorMessages).toEqual(component.errorMessages['password']);
  });

});
