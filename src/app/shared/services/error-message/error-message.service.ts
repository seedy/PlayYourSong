import { Injectable } from '@angular/core';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {MdSnackBar} from '@angular/material';

@Injectable()
export class ErrorMessageService {

  constructor(public snackBar: MdSnackBar) { }

  handleError(error: Response | any, caught: Observable<any>, activateSnackBar?: boolean): Observable<any> {
    let errMsg: string;
    if (error instanceof Response) {
      let body;
      try {
        body = error.json();
      } catch (err) {
        body = error.text();
      }
      body = body || 'Unknown';
      errMsg = '[' + error.status + '] - ' + error.statusText + ' : ' + body;
    } else {
      errMsg = error.message || error.toString();
    }
    if (activateSnackBar) {
      this.snackMessage(errMsg);
    }
    return Observable.throw(errMsg);
  }

  mapErrorMessages(form, data): {} {
    return Object.keys(data)
      .reduce((keyHash, key) => {
        const errorMessages = keyHash[key] = [];

        if (!form.get(key)) {
          return keyHash;
        }

        if (form.get(key).pristine) {
          return keyHash;
        }

        const errors = form.get(key).errors;

        if (errors === null) {
          return keyHash;
        }

        if (errors['required']) {
          errorMessages.push(this.getRequiredMessage(key, errors['required']));
        }

        if (errors['minlength']) {
          errorMessages.push(this.getLengthMessage(key, errors['minlength'], true));
        }

        if (errors['maxlength']) {
          errorMessages.push(this.getLengthMessage(key, errors['maxlength'], false));
        }

        if (errors['pattern']) {
          errorMessages.push(this.getPatternMessage(key, errors['pattern']));
        }

        return keyHash;
      }, {});
  }

  private getRequiredMessage(key: string, errorObject: boolean): string {
    return errorObject === true ? 'Field ' + key + ' is required' : '';
  }

  private getLengthMessage(key: string, errorObject: {actualLength: number, requiredLength: number}, isMinMax: boolean): string {
    const suffix = isMinMax ? 'at least ' : 'less than ';
    return 'Field ' + key + ' must be ' + suffix + errorObject.requiredLength + ' characters long';
  }

  private getPatternMessage(key: string, errorObject: {actualValue: string, requiredPattern: string}): string {
    return 'Field ' + key + ' does not respect the expected pattern';
  }

  private snackMessage(message) {
    this.snackBar.open(message, 'clear', {
      duration: 3000
    });
  }
}
