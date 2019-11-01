import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  userLogged: Boolean = false;


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        this.userLogged = this.userService.logIn;
      }
    })
  }

  logout() {
    this.userService.logout();
    window.location.reload();
  }
}
