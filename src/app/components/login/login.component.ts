import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  user: User = new User()

  constructor(private userService: UserService, private router: Router) { }


  login() {
    if (this.loginForm.valid) {
      this.user.email = this.formEmail.value
      this.user.password = this.formPassword.value

      this.userService.login(this.user)
        .then(header => {
          localStorage.setItem('token', header.jwt)
          this.router.navigateByUrl("/")
        })
        .catch(error => console.log(error))
    }
  }

  ngOnInit() {
    if (this.userService.logIn)
      this.router.navigateByUrl("students/add")

    this.loginForm = new FormGroup({
      'email': new FormControl(this.user.email, [Validators.required, Validators.email]),
      'password': new FormControl(this.user.password, [Validators.required])
    })
  }

  get formEmail() {
    return this.loginForm.get('email')
  }
  get formPassword() {
    return this.loginForm.get('password')
  }


}
