import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/models/student';
import { CareerService } from 'src/app/services/career.service';
import { Careers } from 'src/app/models/careers';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {

  private student: Student;
  private career: Careers = null;
  constructor(
    private careerService: CareerService,
    private studentService: StudentService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.studentService.findById(id)
      .then(student => {
        this.student = student;
        this.careerService.findById(student.careerId).then(
          career => this.career = career
        )
      })
      .catch(() => this.router.navigateByUrl("/"))

  }

}
