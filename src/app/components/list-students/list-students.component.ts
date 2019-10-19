import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.scss']
})
export class ListStudentsComponent implements OnInit {

  private students = new Array<Student>();

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.findAll()
      .then(students => this.students = students)
      .catch()
  }

}
