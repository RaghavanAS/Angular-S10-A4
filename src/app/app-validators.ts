import { FormControl, ValidationErrors } from '@angular/forms';

export class AppValidators {
    // Custom validator
    static onlyThreeDigitsAllowed(control: FormControl) {
     //   console.log(control.value);
        const result = control.value.length < 4;
       // console.log(result);
            return result ? null : { onlyThreeDigitsAllowed: true };
        }
}
