import { AbstractControl, ValidationErrors } from '@angular/forms';

export function noWhitespace(control: AbstractControl): ValidationErrors | null {

  const value = control.value as string;

  if (value && value.trim().length === 0) {
    return { whitespace: true };      // there is a problem
  }

  return null;                        // all good
}