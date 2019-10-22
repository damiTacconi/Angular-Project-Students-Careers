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
  message = {
    show: false,
    type: 'success'
  }

  constructor(private userService: UserService) { }


  confirmPassword(c: AbstractControl): { confirmPassword: boolean } {
    if (c.get('password').value !== c.get('confirmPassword').value) {
      return { confirmPassword: true };
    }
  }


  async submit() {
    if (this.registerForm.valid) {
      const { password, email } = this.registerForm.controls;
      const user = new User()
      user.email = email.value
      user.password = password.value
      await this.userService.signUp(user)
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
      "password": new FormControl(this.user.password, [Validators.required, Validators.minLength(5)]),
      "confirmPassword": new FormControl(this.repeatPassword,
        [Validators.required])
    }, {
      validators: [this.confirmPassword]
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

}
