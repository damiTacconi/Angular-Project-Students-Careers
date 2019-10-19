import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private formGroup: FormGroup;
  private user: User = new User();
  private repeatPassword: string = '';

  constructor() { }

  checkValidPassword() {
    const repeatPassword = this.formGroup.get("repeatPassword").value;
    const password = this.formGroup.get("password").value;
    return password === repeatPassword ? true : false;
  }

  submit() {
    const validPassword = this.checkValidPassword();
    if (this.formGroup.valid && validPassword) {

    } else if (!validPassword) {
      alert("LAS CONTASEÑAS NO COINCIDEN")
    } else {
      alert("COMPLETE CORRECTAMENTE LOS CAMPOS")
      console.error(this.formGroup.errors)
    }
  }
  ngOnInit() {
    this.formGroup = new FormGroup({
      "email": new FormControl(this.user.email, [Validators.email, Validators.required]),
      "password": new FormControl(this.user.password, [Validators.required]),
      "repeatPassword": new FormControl(this.repeatPassword, [Validators.required])
    })
  }

}
