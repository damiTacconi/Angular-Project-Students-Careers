import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { CareerService } from 'src/app/services/career.service';
import { Careers } from 'src/app/models/careers';
import { FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms"
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

  private studentForm: FormGroup;
  private student = new Student();
  private careers: Array<Careers> = [];
  private careerId: number;

  constructor(
    private userService: UserService,
    private studentService: StudentService, private careerService: CareerService, private router: Router) { }


  validateDni() {
    return (control: AbstractControl): Promise<any> | Observable<any> => {
      return this.studentService.validateDni(control.value).pipe(
        map(res => null),
        catchError(error => of({
          'invalidDni': true
        }))
      )
    }
  }
  validateEmail() {
    return (control: AbstractControl): Promise<any> | Observable<any> => {
      return this.studentService.validateEmail(control.value).pipe(
        map(res => null),
        catchError(error => of({
          'invalidEmail': true
        }))
      )
    }
  }
  add() {
    if (this.studentForm.valid) {
      const { firstName, lastName, email, dni, address, careerId } = this.studentForm.controls;

      this.student.firstName = firstName.value;
      this.student.lastName = lastName.value;
      this.student.dni = dni.value;
      this.student.address = address.value;
      this.student.careerId = careerId.value;
      this.student.email = email.value;

      this.studentService.insert(this.student).subscribe(
        res => { alert("AGEGADO CON EXITO !"); this.studentForm.reset() },
        error => { alert("NO SE PUDO AGREGAR AL ESTUDIANTE") }
      );
    }
  }
  ngOnInit(): void {
    this.careerService.findAll().then(careers => this.careers = careers);
    this.studentForm = new FormGroup({
      'firstName': new FormControl(this.student.firstName, [Validators.required]),
      'lastName': new FormControl(this.student.lastName, [Validators.required]),
      'email': new FormControl(this.student.email, [Validators.required, Validators.email], [this.validateEmail()]),
      'dni': new FormControl(this.student.dni, [Validators.required], [this.validateDni()]),
      'address': new FormControl(this.student.address, [Validators.required]),
      'careerId': new FormControl(this.student.careerId, [Validators.required, Validators.min(1)])
    });
  }

  get firstName() {
    return this.studentForm.get('firstName')
  }

  get formEmail() {
    return this.studentForm.get('email');
  }

  get formDni() {
    return this.studentForm.get('dni');
  }
}
