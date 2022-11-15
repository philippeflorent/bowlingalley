import { ValidatorFn,ValidationErrors,AbstractControl
 } from '@angular/forms';

import { BowlingData } from '../model/bowlingData.class'

export function PinsCountValidator(bowlingData: BowlingData): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const standingPins = bowlingData.standingPins;

    const fallenPins = +control.value;

    return (fallenPins <= 0) || (fallenPins > standingPins) ? { pinsCount: {value: control.value} } : null;
  };
}