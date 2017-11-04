import {TestBed, inject, async} from '@angular/core/testing';
import {
  BaseRequestOptions, ConnectionBackend, Http, HttpModule, RequestOptions, Response,
  ResponseOptions, ResponseType
} from '@angular/http';
import {AuthHttp, JwtHelper} from 'angular2-jwt';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/skip';

import { LoginService } from './login.service';
import {APP_CONFIG, AppConfig} from '../../../core/config/pysConfig';
import {pysAuthHttpFactoryProvider} from '../../../core/config/pysAuthHttp.service';
import {StorageService} from '../storage/storage.service';
import {ErrorMessageService} from '../error-message/error-message.service';
import {Credentials} from '../../classes/credentials';
import {Account} from '../../classes/account';


fdescribe('LoginService', () => {
  let errorMessageServiceStub, storageServiceStub, appConfigStub;
  const msgServiceError = 'fixError';

  beforeEach(() => {
    errorMessageServiceStub = jasmine.createSpyObj('errorMessage', ['handleError']);
    (errorMessageServiceStub.handleError as jasmine.Spy).and.returnValue(Observable.of(msgServiceError));

    storageServiceStub = jasmine.createSpyObj('storage', ['getKey', 'storeKey', 'deleteKey']);

    appConfigStub = {
      apiEndpoint: 'http://localhost:3002'
    };
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        LoginService,
        AuthHttp,
        JwtHelper,
        pysAuthHttpFactoryProvider,
        {provide: ErrorMessageService, useValue: errorMessageServiceStub},
        {provide: StorageService, useValue: storageServiceStub},
        {provide: ConnectionBackend, useClass: MockBackend},
        Http,
        {provide: RequestOptions, useClass: BaseRequestOptions},
        {provide: APP_CONFIG, useValue: appConfigStub}
      ]
    });
  });

  it('checks service public api and constructor', inject([LoginService, APP_CONFIG], (service: LoginService, config: AppConfig) => {
    expect(service).toBeTruthy();

    expect(service.isLoggedIn$).toEqual(jasmine.any(Observable));
    service.isLoggedIn$.subscribe((isLoggedIn) => {
      expect(isLoggedIn).toEqual(false);
    });

    expect(service.endpoint).toEqual(config.apiEndpoint + '/account');
    expect(service.redirectUrl).toBeUndefined();

    expect(service.login).toEqual(jasmine.any(Function));
    expect(service.register).toEqual(jasmine.any(Function));
    expect(service.checkToken).toEqual(jasmine.any(Function));
    expect(service.logout).toEqual(jasmine.any(Function));
    expect(service.isLoggedIn).toEqual(jasmine.any(Function));
  }));

  it('checks method login, success, successful login check',
    async(inject([LoginService, ConnectionBackend], (service: LoginService, backend: MockBackend) => {
      const expectedUrl = service.endpoint + '/login';
      const creds = new Credentials('id', 'pass');
      const token = 'mock';
      const options = new ResponseOptions({
        body: JSON.stringify({token: token})
      });
      const loginState = true;
      spyOn(service, 'isLoggedIn').and.returnValue(loginState);

      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockRespond(new Response(options));
        expect(connection.request.url).toEqual(expectedUrl);
        expect(connection.request.getBody()).toEqual(JSON.stringify(creds));
      });

      // first emit from behavioursubject : not logged in
      service.isLoggedIn$.take(1).subscribe((isLoggedIn) => {
        expect(isLoggedIn).toEqual(false);
      });

      // emit from behavioursubject after login : logged in
      service.isLoggedIn$.skip(1).subscribe((isLoggedIn) => {
        expect(isLoggedIn).toEqual(loginState);
      });

      service.login(creds)
        .subscribe((response) => {
          expect(response).toEqual(JSON.parse(options.body.toString()));
        });

      expect(storageServiceStub.storeKey).toHaveBeenCalledWith('token', token);
      expect(service.isLoggedIn).toHaveBeenCalled();
    })));

  it('checks method login, success, fail login check',
    async(inject([LoginService, ConnectionBackend], (service: LoginService, backend: MockBackend) => {
      const expectedUrl = service.endpoint + '/login';
      const creds = new Credentials('id', 'pass');
      const token = 'mock';
      const options = new ResponseOptions({
        body: JSON.stringify({token: token})
      });
      const loginState = false;
      spyOn(service, 'isLoggedIn').and.returnValue(loginState);

      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockRespond(new Response(options));
        expect(connection.request.url).toEqual(expectedUrl);
        expect(connection.request.getBody()).toEqual(JSON.stringify(creds));
      });

      // first emit from behavioursubject : not logged in
      service.isLoggedIn$.take(1).subscribe((isLoggedIn) => {
        expect(isLoggedIn).toEqual(false);
      });

      // emit from behavioursubject after login : logged in
      service.isLoggedIn$.skip(1).subscribe((isLoggedIn) => {
        expect(isLoggedIn).toEqual(loginState);
      });

      service.login(creds)
        .subscribe((response) => {
          expect(response).toEqual(JSON.parse(options.body.toString()));
        });

      expect(storageServiceStub.storeKey).toHaveBeenCalledWith('token', token);
      expect(service.isLoggedIn).toHaveBeenCalled();
    })));

  it('checks method login, server error',
    async(inject([LoginService, ConnectionBackend, ErrorMessageService],
      (service: LoginService, backend: MockBackend, errorMsg: ErrorMessageService) => {
        const expectedUrl = service.endpoint + '/login';
        const creds = new Credentials('id', 'pass');
        const error = new Response(new ResponseOptions({type: ResponseType.Error, status: 500, body: {error: 'err'}})) as Response & Error;

        spyOn(service, 'isLoggedIn');

        backend.connections.subscribe((connection: MockConnection) => {
          connection.mockError(error);
          expect(connection.request.url).toEqual(expectedUrl);
          expect(connection.request.getBody()).toEqual(JSON.stringify(creds));
        });

        // first emit from behavioursubject : not logged in
        service.isLoggedIn$.take(1).subscribe((isLoggedIn) => {
          expect(isLoggedIn).toEqual(false);
        });

        service.login(creds)
          .subscribe((response) => {
            expect(response).toEqual(msgServiceError);
          });

        expect(storageServiceStub.storeKey).not.toHaveBeenCalled();
        expect(service.isLoggedIn).not.toHaveBeenCalled();
        expect(errorMsg.handleError).toHaveBeenCalled();
        expect((errorMsg.handleError as jasmine.Spy).calls.argsFor(0)[0]).toEqual(error);
      })));

  it('checks method register, success, successful login check',
    async(inject([LoginService, ConnectionBackend], (service: LoginService, backend: MockBackend) => {
      const expectedUrl = service.endpoint + '/register';
      const creds = new Account('pass', 'mock', 'mail');
      const token = 'mock';
      const options = new ResponseOptions({
        body: JSON.stringify({token: token})
      });
      const loginState = true;
      spyOn(service, 'isLoggedIn').and.returnValue(loginState);

      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockRespond(new Response(options));
        expect(connection.request.url).toEqual(expectedUrl);
        expect(connection.request.getBody()).toEqual(JSON.stringify(creds));
      });

      // first emit from behavioursubject : not logged in
      service.isLoggedIn$.take(1).subscribe((isLoggedIn) => {
        expect(isLoggedIn).toEqual(false);
      });

      // emit from behavioursubject after login : logged in
      service.isLoggedIn$.skip(1).subscribe((isLoggedIn) => {
        expect(isLoggedIn).toEqual(loginState);
      });

      service.register(creds)
        .subscribe((response) => {
          expect(response).toEqual(JSON.parse(options.body.toString()));
        });

      expect(storageServiceStub.storeKey).toHaveBeenCalledWith('token', token);
      expect(service.isLoggedIn).toHaveBeenCalled();
    })));

  it('checks method register, success, fail login check',
    async(inject([LoginService, ConnectionBackend], (service: LoginService, backend: MockBackend) => {
      const expectedUrl = service.endpoint + '/register';
      const creds = new Account('pass', 'mock', 'mail');
      const token = 'mock';
      const options = new ResponseOptions({
        body: JSON.stringify({token: token})
      });
      const loginState = false;
      spyOn(service, 'isLoggedIn').and.returnValue(loginState);

      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockRespond(new Response(options));
        expect(connection.request.url).toEqual(expectedUrl);
        expect(connection.request.getBody()).toEqual(JSON.stringify(creds));
      });

      // first emit from behavioursubject : not logged in
      service.isLoggedIn$.take(1).subscribe((isLoggedIn) => {
        expect(isLoggedIn).toEqual(false);
      });

      // emit from behavioursubject after login : logged in
      service.isLoggedIn$.skip(1).subscribe((isLoggedIn) => {
        expect(isLoggedIn).toEqual(loginState);
      });

      service.register(creds)
        .subscribe((response) => {
          expect(response).toEqual(JSON.parse(options.body.toString()));
        });

      expect(storageServiceStub.storeKey).toHaveBeenCalledWith('token', token);
      expect(service.isLoggedIn).toHaveBeenCalled();
    })));

  it('checks method register, server error',
    async(inject([LoginService, ConnectionBackend, ErrorMessageService],
      (service: LoginService, backend: MockBackend, errorMsg: ErrorMessageService) => {
        const expectedUrl = service.endpoint + '/register';
        const creds = new Account('pass', 'mock', 'mail');
        const error = new Response(new ResponseOptions({type: ResponseType.Error, status: 500, body: {error: 'err'}})) as Response & Error;
        spyOn(service, 'isLoggedIn');

        backend.connections.subscribe((connection: MockConnection) => {
          connection.mockError(error);
          expect(connection.request.url).toEqual(expectedUrl);
          expect(connection.request.getBody()).toEqual(JSON.stringify(creds));
        });

        // first emit from behavioursubject : not logged in
        service.isLoggedIn$.take(1).subscribe((isLoggedIn) => {
          expect(isLoggedIn).toEqual(false);
        });

        service.register(creds)
          .subscribe((response) => {
            expect(response).toEqual(msgServiceError);
          });

        expect(storageServiceStub.storeKey).not.toHaveBeenCalled();
        expect(service.isLoggedIn).not.toHaveBeenCalled();
        expect(errorMsg.handleError).toHaveBeenCalled();
        expect((errorMsg.handleError as jasmine.Spy).calls.argsFor(0)[0]).toEqual(error);
      })));

  it('checks method logout, fail logout check',
    inject([LoginService, StorageService], (service: LoginService, storage: StorageService) => {
      spyOn(service, 'isLoggedIn').and.returnValue(true);

      service.isLoggedIn$.take(1).subscribe((isLoggedIn) => {
        expect(isLoggedIn).toEqual(false);
      });

      service.isLoggedIn$.skip(1).subscribe((isLoggedIn) => {
        expect(isLoggedIn).toEqual(true);
      });

      service.logout();

      expect(storage.deleteKey).toHaveBeenCalledWith('token');
    }));

  it('checks method logout, success logout check',
    inject([LoginService, StorageService], (service: LoginService, storage: StorageService) => {
      spyOn(service, 'isLoggedIn').and.returnValue(false);

      service.isLoggedIn$.take(1).subscribe((isLoggedIn) => {
        expect(isLoggedIn).toEqual(false);
      });

      service.isLoggedIn$.skip(1).subscribe((isLoggedIn) => {
        expect(isLoggedIn).toEqual(false);
      });

      service.logout();

      expect(storage.deleteKey).toHaveBeenCalledWith('token');
    }));

  it('checks method isLoggedIn, no token',
    inject([LoginService, StorageService, JwtHelper], (service: LoginService, storage: StorageService) => {
      (storage.getKey as jasmine.Spy).and.returnValue(null);

      expect(service.isLoggedIn()).toBe(false);
    }));

  it('checks method isLoggedIn, token is expired',
    inject([LoginService, StorageService], (service: LoginService, storage: StorageService) => {
      const token = 'token';
      (storage.getKey as jasmine.Spy).and.returnValue(token);
      spyOn(service.jwtHelper, 'isTokenExpired').and.returnValue(true);

      expect(service.isLoggedIn()).toBe(false);
    }));

  it('checks method isLoggedIn, token is not expired',
    inject([LoginService, StorageService, JwtHelper], (service: LoginService, storage: StorageService) => {
      const token = 'token';
      (storage.getKey as jasmine.Spy).and.returnValue(token);
      spyOn(service.jwtHelper, 'isTokenExpired').and.returnValue(false);

      expect(service.isLoggedIn()).toBe(true);
    }));



});
