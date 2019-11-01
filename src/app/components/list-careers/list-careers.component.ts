import { Component, OnInit } from '@angular/core';
import { Careers } from 'src/app/models/careers';
import { CareerService } from 'src/app/services/career.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-careers',
  templateUrl: './list-careers.component.html',
  styleUrls: ['./list-careers.component.scss']
})
export class ListCareersComponent implements OnInit {

  private careers: Array<Careers> = [];

  constructor(
    private userService: UserService, private router: Router,
    private careerService: CareerService) { }

  ngOnInit() {
    this.careerService.findAll()
      .then(careers => this.careers = careers);
  }

}
