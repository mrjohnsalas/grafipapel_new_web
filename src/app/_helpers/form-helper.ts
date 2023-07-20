import { AbstractControl, FormGroup } from '@angular/forms';

import { FormControlErrorMessage } from '@models/form-control-error-message.model';

export class FormHelper {
    errorMessages!: FormControlErrorMessage[];
    formGroup!: FormGroup;

    constructor() { }

    checkControlError(control: AbstractControl): boolean {
        return (control.dirty || control.touched) && (control.errors !== null || control.invalid);
    }

    getControl(controlName: string): AbstractControl {
        return this.formGroup.get(controlName)!;
    }
}