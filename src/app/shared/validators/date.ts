import { AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";

export class DateValidators {

  /**
   * Check if the control value is greater than the passed one
   * @param { Date } date
   * @returns null | ValidationsErrors
   */
  static dateAfter(date: Date = new Date()): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      let givenDate = new Date(control.value);
      if (givenDate < date) {
        return { invalidDate: `La date spécifiée n'est pas valide.` };
      }
      return null;
    };
  }

}
