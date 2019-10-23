import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  user: User = new User();
  repeatPassword: string = '';
  password: string;
  message = {
    show: false,
    type: 'success'
  }

  constructor(private userService: UserService) { }


  validatePassword(password: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const confirmPassword = control.value;
      console.log(password)
      return password !== confirmPassword ? {
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
      this.userService.signUp(this.user)
        .then(() => this.registerForm.reset())
        .catch(() => this.message.type = 'danger')
        .finally(() => this.message.show = true)
    }
  }

  hideMessage() {
    this.message.show = false;
  }
  ngOnInit() {
    this.registerForm = new FormGroup({
      "email": new FormControl(this.user.email, [Validators.required, Validators.email]),
      "password": new FormControl(this.user.password, [Validators.required]),
      "confirmPassword": new FormControl(this.repeatPassword,
        [Validators.required, this.validatePassword(this.password)])
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
