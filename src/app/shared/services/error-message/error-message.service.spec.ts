import { TestBed, inject, async } from '@angular/core/testing';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';

import { ErrorMessageService } from './error-message.service';

fdescribe('ErrorMessageService', () => {
  let snackbarStub;
  beforeEach(() => {
    snackbarStub = jasmine.createSpyObj('snackbar', ['open']);


    TestBed.configureTestingModule({
      providers: [
        ErrorMessageService,
        {provide: MatSnackBar, useValue: snackbarStub}
      ]
    });
  });

  it('checks service api', inject([ErrorMessageService], (service: ErrorMessageService) => {
    expect(service).toBeTruthy();
    expect(service.snackBar).toEqual(snackbarStub);
    expect(service.handleError).toEqual(jasmine.any(Function));
    expect(service.mapErrorMessages).toEqual(jasmine.any(Function));
  }));

  it('checks method handleError, not instance of Response, no snackbar',
    async(inject([ErrorMessageService], (service: ErrorMessageService) => {
      const message = 'mock';
      const notResponseError = new Error(message);
      const snack = false;
      const caught = Observable.from('');
      service.handleError(notResponseError, caught, snack)
        .subscribe(() => {
          fail('expected observable to throw');
        }, (error) => {
          expect(snackbarStub.open as jasmine.Spy).not.toHaveBeenCalled();
          expect(error).toEqual(message);
        });

    })));

  it('checks method handleError, not instance of Response, snackbar',
    async(inject([ErrorMessageService], (service: ErrorMessageService) => {
      const message = 'mock';
      const notResponseError = new Error(message);
      const snack = true;
      const caught = Observable.from('');
      service.handleError(notResponseError, caught, snack)
        .subscribe(() => {
          fail('expected observable to throw');
        }, (error) => {
          expect(snackbarStub.open as jasmine.Spy).toHaveBeenCalled();
          expect((snackbarStub.open as jasmine.Spy).calls.argsFor(0)[0]).toEqual(message);
          expect(error).toEqual(message);
        });

    })));

  it('checks method handleError, instance of Response, no snackbar',
    async(inject([ErrorMessageService], (service: ErrorMessageService) => {
      const body = null;
      const status = 500;
      const statusText = 'server error';
      const responseError = new Response(body, {status: status, statusText: statusText});
      const expectedBody = responseError.json();
      const snack = false;
      const caught = Observable.from('');
      const expectedMessage = '[' + status + '] - ' + statusText + ' : ' + expectedBody;

      service.handleError(responseError, caught, snack)
        .subscribe(() => {
          fail('expected observable to throw');
        }, (error) => {
          expect(snackbarStub.open as jasmine.Spy).not.toHaveBeenCalled();
          expect(error).toEqual(expectedMessage);
        });

    })));

  it('checks method handleError, instance of Response, snackbar',
    async(inject([ErrorMessageService], (service: ErrorMessageService) => {
      const body = null;
      const status = 500;
      const statusText = 'server error';
      const responseError = new Response(body, {status: status, statusText: statusText});
      const expectedBody = responseError.json();
      const snack = true;
      const caught = Observable.from('');
      const expectedMessage = '[' + status + '] - ' + statusText + ' : ' + expectedBody;

      service.handleError(responseError, caught, snack)
        .subscribe(() => {
          fail('expected observable to throw');
        }, (error) => {
          expect(snackbarStub.open as jasmine.Spy).toHaveBeenCalled();
          expect((snackbarStub.open as jasmine.Spy).calls.argsFor(0)[0]).toEqual(expectedMessage);
          expect(error).toEqual(expectedMessage);
        });

    })));

  it('checks method mapErrorMessages, key not in form',
    inject([ErrorMessageService], (service: ErrorMessageService) => {
      const notInForm = 'accent';
      const data = {[notInForm]: ''};
      const expectedError = {[notInForm]: []};
      const form = new FormGroup({
        [notInForm]: new FormControl()
      });
      expect(service.mapErrorMessages(form, data)).toEqual(expectedError);
    }));

  it('checks method mapErrorMessages, key in form, control pristine',
    inject([ErrorMessageService], (service: ErrorMessageService) => {
      const pristineInForm = 'name';
      const data = {[pristineInForm]: ''};
      const form = new FormGroup({
        [pristineInForm]: new FormControl()
      });
      const expectedError = {[pristineInForm]: []};
      form.get(pristineInForm).markAsPristine();
      expect(service.mapErrorMessages(form, data)).toEqual(expectedError);
    }));

  it('checks method mapErrorMessages, key in form, control dirty, error unmapped',
    inject([ErrorMessageService], (service: ErrorMessageService) => {
      const unmappedDirty = 'name';
      const data = {[unmappedDirty]: 'toto'};
      const expectedError = {[unmappedDirty]: []};
      const form = new FormGroup({
        [unmappedDirty]: new FormControl()
      });
      form.get(unmappedDirty).markAsDirty();
      expect(service.mapErrorMessages(form, data)).toEqual(expectedError);
    }));


  it('checks method mapErrorMessages, key in form, control dirty, control required',
    inject([ErrorMessageService], (service: ErrorMessageService) => {
      const key = 'name';
      const data = {[key]: ''};
      const expectedError = {[key]: ['Field ' + key + ' is required']};
      const control = new FormControl();
      control.setErrors({'required': true});
      const form = new FormGroup({
        [key]: control
      });
      form.get(key).markAsDirty();
      expect(service.mapErrorMessages(form, data)).toEqual(expectedError);
    }));

  it('checks method mapErrorMessages, key in form, control dirty, control minLength',
    inject([ErrorMessageService], (service: ErrorMessageService) => {
      const key = 'name';
      const data = {[key]: ''};
      const length = 10;
      const expectedError = {[key]: ['Field ' + key + ' must be ' + 'at least ' + length + ' characters long']};
      const control = new FormControl();
      control.setErrors({'minlength': {actualLength: data[key].length, requiredLength: length}});
      const form = new FormGroup({
        [key]: control
      });
      form.get(key).markAsDirty();
      expect(service.mapErrorMessages(form, data)).toEqual(expectedError);
    }));

  it('checks method mapErrorMessages, key in form, control dirty, control maxLength',
    inject([ErrorMessageService], (service: ErrorMessageService) => {
      const key = 'name';
      const data = {[key]: 'ffgbyhyh'};
      const length = 5;
      const expectedError = {[key]: ['Field ' + key + ' must be ' + 'less than ' + length + ' characters long']};
      const control = new FormControl();
      control.setErrors({'maxlength': {actualLength: data[key].length, requiredLength: length}});
      const form = new FormGroup({
        [key]: control
      });
      form.get(key).markAsDirty();
      expect(service.mapErrorMessages(form, data)).toEqual(expectedError);
    }));

  it('checks method mapErrorMessages, key in form, control dirty, control pattern',
    inject([ErrorMessageService], (service: ErrorMessageService) => {
      const key = 'name';
      const data = {[key]: 'ffgbyhyh'};
      const pattern = '^toto$';
      const expectedError = {[key]: ['Field ' + key + ' does not respect the expected pattern']};
      const control = new FormControl();
      control.setErrors({'pattern': {actualValue: data[key], requiredPattern: pattern}});
      const form = new FormGroup({
        [key]: control
      });
      form.get(key).markAsDirty();
      expect(service.mapErrorMessages(form, data)).toEqual(expectedError);
    }));


});
