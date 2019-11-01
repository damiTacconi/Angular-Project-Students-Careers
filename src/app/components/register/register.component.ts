import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators/'
import { Router } from '@angular/router';
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    user: User = new User();
    confirmPassword: string = '';
    password: string;
    message = {
        show: false,
        type: 'success'
    }

    constructor(private userService: UserService, private router: Router) { }


    validateEmail() {
        return (control: AbstractControl): Observable<any> => {
            return this.userService.validateEmail(control.value).pipe(
                map(res => null),
                catchError(error => of({
                    'invalidEmail': true
                }))
            )
        }
    }

    validatePassword(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const confirmPassword = control.value;
            return this.password !== confirmPassword ? {
                'passwordInvalid': {
                    value: true
                }
            } : null;
        }
    }


    submit() {
        if (this.registerForm.valid) {

            const { password, email } = this.registerForm.controls;
            this.user.email = email.value
            this.user.password = password.value
            this.userService.signUp(this.user).subscribe(response => {
                this.registerForm.reset();
                this.message.show = true;
            },
                error => {
                    this.message.show = true;
                    this.message.type = 'danger'
                })
        }
    }

    hideMessage() {
        this.message.show = false;
    }
    ngOnInit() {
        this.registerForm = new FormGroup({
            "email": new FormControl('', [Validators.required, Validators.email],
                [this.validateEmail()]),
            "password": new FormControl(this.user.password, [Validators.required, Validators.minLength(5)]),
            "confirmPassword": new FormControl(this.confirmPassword,
                [Validators.required, this.validatePassword()])
        })
    }

    get formConfirmPassword() {
        return this.registerForm.get('confirmPassword')
    }

    get formPassword() {
        return this.registerForm.get('password')
    }

    get formEmail() {
        return this.registerForm.get('email')
    }

    changePassword(event) {
        this.password = event.target.value;
    }
}
