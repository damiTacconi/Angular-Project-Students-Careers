import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { Careers } from 'src/app/models/careers';
import { StudentService } from 'src/app/services/student.service';
import { CareerService } from 'src/app/services/career.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modify-student',
  templateUrl: './modify-student.component.html',
  styleUrls: ['./modify-student.component.scss']
})
export class ModifyStudentComponent implements OnInit {

  private idRoute: number;

  private studentId: number;
  private firstName: string;
  private lastName: string;
  private email: string;
  private address: string;
  private dni: string;
  private careerId: number;

  private careers: Array<Careers> = [];

  constructor(
    private userService: UserService, private router: Router,
    private studentService: StudentService, private careerService: CareerService, private route: ActivatedRoute) { }

  update() {
    if (this.firstName != undefined && this.lastName != undefined && this.address != undefined
      && this.email != undefined && this.dni != undefined && this.careerId != undefined) {

      const student = new Student();
      student.address = this.address;
      student.email = this.email;
      student.lastName = this.lastName;
      student.dni = this.dni;
      student.firstName = this.firstName;
      student.careerId = this.careerId;
      student.studentId = this.idRoute;

      this.studentService.update(student)
        .then(() => {
          alert("EL ESTUDIANTE SE MODIFICO CON EXITO");
        })
        .catch((e) => {

          alert(`Hubo un problema al actualizar los datos: ${e.error.message}`)
          console.log(e);
        });

    } else alert("COMPLETAR CAMPOS")

  }
  ngOnInit() {
    this.idRoute = Number(this.route.snapshot.paramMap.get("id"));
    this.studentService.findById(this.idRoute).then(student => {
      this.studentId = student.studentId;
      this.firstName = student.firstName;
      this.lastName = student.lastName;
      this.email = student.email;
      this.dni = student.dni;
      this.address = student.address;
      this.careerId = student.careerId;
    });
    this.careerService.findAll().then(careers => this.careers = careers)
  }

}
