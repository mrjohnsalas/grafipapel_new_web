import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CustomValidatorService {
  
  constructor() {}

  dateLessToday(control: FormControl) {
    if (control.value) {

      let currentDate = new Date(new Date().toDateString()).getTime();
      let dateParts = control.value.split('-');
      let value = new Date(Number.parseInt(dateParts[0]), Number.parseInt(dateParts[1]) -1, Number.parseInt(dateParts[2])).getTime();

      if (value < currentDate) {
        return { dateLessToday: true };
      }
    }
    return null;
  }

  dateTimeLessToday(control: FormControl) {
    if (control.value) {
      let currentDate = new Date().getTime();
      let value = new Date(control.value).getTime();
      if (value < currentDate) {
        return { dateLessToday: true };
      }
    }
    return null;
  }

  dateGreaterToday(control: FormControl) {
    if (control.value) {
      let currentDate = new Date(new Date().toDateString()).getTime();
      let dateParts = control.value.split('-');
      let value = new Date(Number.parseInt(dateParts[0]), Number.parseInt(dateParts[1]) -1, Number.parseInt(dateParts[2])).getTime();
      if (value > currentDate) {
        return { dateGreaterToday: true };
      }
    }
    return null;
  }

  dateTimeGreaterToday(control: AbstractControl) {
    if (control.value) {
      let currentDate = new Date().getTime();
      let value = new Date(control.value).getTime();
      if (value > currentDate) {
        return { dateTimeGreaterToday: true };
      }
    }
    return null;
  }

  negativeNumber(control: FormControl) {
    if (control.value) {
      let value = Number(control.value);
      if (value < 0) {
        return { negativeNumber: true };
      }
    }
    return null;
  }

  numberGreaterThanZero(control: FormControl) {
    if (control.value) {
      let value = Number(control.value);
      if (value <= 0) {
        return { numberGreaterThanZero: true };
      }
    }
    return null;
    
  }

  multipleNumber(multipleValue: number): ValidatorFn {
    return (control: AbstractControl) => {
      if (control == null || control.value == null)
        return null;

      let value = Number(control.value);

      if (value % multipleValue == 0) {
        return null;
      } else {
        return { multipleNumber: { valid: false } };
      }
    };
  }

  dateLessThan(fromControlName: string, toControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const fromControl = control.get(fromControlName)!;
      const toControl = control.get(toControlName)!;

      if (fromControl.errors && !fromControl.errors['dateLessThan']) {
        return null;
      }

      if (toControl.errors && !toControl.errors['dateLessThan']) {
        return null;
      }

      if (!toControl.value) {
        return null;
      }

      if (toControl.value < fromControl.value) {
        toControl.setErrors({ dateLessThan: true });
        return { dateLessThan: true };
      } else {
        toControl.setErrors(null);
        return null;
      }
    };
  }

  dateMinimumDuration(fromControlName: string, toControlName: string, minutes: number = 10): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const fromControl = control.get(fromControlName)!;
      const toControl = control.get(toControlName)!;

      if (fromControl.errors && !fromControl.errors['dateMinimumDuration']) {
        return null;
      }

      if (toControl.errors && !toControl.errors['dateMinimumDuration']) {
        return null;
      }

      if (!toControl.value) {
        return null;
      }

      let fromControlValue = new Date(fromControl.value).getTime() / 60000;
      let toControlValue = new Date(toControl.value).getTime() / 60000;
      let differenceValue = toControlValue - fromControlValue;

      if (differenceValue < minutes) {
        toControl.setErrors({ dateMinimumDuration: true });
        return { dateMinimumDuration: true };
      } else {
        toControl.setErrors(null);
        return null;
      }
    };
  }

  dateGreaterThan(fromControlName: string, toControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const fromControl = control.get(fromControlName)!;
      const toControl = control.get(toControlName)!;

      if (fromControl.errors && !fromControl.errors['dateGreaterThan']) {
        return null;
      }

      if (toControl.errors && !toControl.errors['dateGreaterThan']) {
        return null;
      }

      if (!toControl.value) {
        return null;
      }

      if (toControl.value > fromControl.value) {
        toControl.setErrors({ dateGreaterThan: true });
        return { dateGreaterThan: true };
      } else {
        toControl.setErrors(null);
        return null;
      }
    };
  }

  dateEqualThan(fromControlName: string, toControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const fromControl = control.get(fromControlName)!;
      const toControl = control.get(toControlName)!;

      if (fromControl.errors && !fromControl.errors['dateEqualThan']) {
        return null;
      }

      if (toControl.errors && !toControl.errors['dateEqualThan']) {
        return null;
      }

      if (!toControl.value) {
        return null;
      }

      if (fromControl.value == toControl.value) {
        toControl.setErrors({ dateEqualThan: true });
        return { dateEqualThan: true };
      } else {
        toControl.setErrors(null);
        return null;
      }
    };
  }

  mustMatch(firstControlName: string, matchingControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const firstControl = control.get(firstControlName)!;
      const matchingControl = control.get(matchingControlName)!;

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return null;
      }

      if (firstControl.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
        return { mustMatch: true };
      } else {
        matchingControl.setErrors(null);
        return null;
      }
    };
  }

  emailValidator(control: AbstractControl) {
    const emailPatternRegex = /^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
    if (emailPatternRegex.test(control.value)) {
      return null;
    }
    return { 'emailValidator': true };
  }
}
