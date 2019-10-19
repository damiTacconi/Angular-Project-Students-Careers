import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { CareerService } from 'src/app/services/career.service';
import { Careers } from 'src/app/models/careers';
import { FormGroup, FormControl, Validators } from "@angular/forms"
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

  constructor(private studentService: StudentService, private careerService: CareerService) { }


  add() {

  }
  ngOnInit(): void {
    this.careerService.findAll().then(careers => this.careers = careers);

    this.studentForm = new FormGroup({
      'firstName': new FormControl(this.student.firstName, [Validators.required]),
      'lastName': new FormControl(this.student.lastName, [Validators.required]),
      'email': new FormControl(this.student.email, [Validators.required, Validators.email]),
      'dni': new FormControl(this.student.dni, [Validators.required]),
      'address': new FormControl(this.student.address, [Validators.required]),
      'careerId': new FormControl(this.student.careerId, [Validators.required, Validators.min(1)])
    });
  }

  get firstName() {
    return this.studentForm.get('firstName')
  }
}
