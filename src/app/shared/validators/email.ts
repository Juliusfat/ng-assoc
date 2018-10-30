import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { of, Observable } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { MemberService } from 'src/app/core/member/member.service';
import { Member } from 'src/app/core/member/member.model';

// by Guillaume

export class EmailValidators {

    /**
     * Check is the email of the control is already in DB.
     * @param { MemberService } service 
     */
    static isEmailUnique (service:MemberService): AsyncValidatorFn {
        return (control:AbstractControl): Observable<ValidationErrors> => {
            return service.getMemberByEmail(control.value).pipe(
                switchMap((user:Member) => {
                    if (user) {
                        return of({ emailExists: true })
                    } else {
                        return of(null)
                    }
                })               
            );
        }
    }
    
}