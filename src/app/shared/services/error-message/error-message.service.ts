import { Injectable } from '@angular/core';

@Injectable()
export class ErrorMessageService {

  constructor() { }

  mapErrorMessages(form, data): string[] {
    return Object.keys(data)
      .map((key) => {
        if(!form.get(key)){
          return null;
        }
        const errors = form.get(key).errors;
        if (errors['required']) {
          return this.getRequiredMessage(key, errors['required']);
        }

        if (errors['minlength']) {
          return this.getLengthMessage(key, errors['minlength'].requiredLength, true);
        }

        if (errors['maxlength']) {
          return this.getLengthMessage(key, errors['maxlength'].requiredLength, false);
        }

      });
  }

  private getRequiredMessage(key, value): string{
    return value === true ? 'Field ' + key + ' is required' : '';
  }

  private getLengthMessage(key, value, isMinMax){
    const suffix = isMinMax ? 'at least ' : 'less than ';
    return 'Field ' + key + ' must be ' + suffix + value + ' characters long';
  }
}
