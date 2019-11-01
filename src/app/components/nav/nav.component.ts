import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  userLogged: Boolean = false;


  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userLogged = this.userService.logIn;
    console.log(this.userService.user)
  }

  logout() {
    this.userService.logout();
    window.location.reload();
  }
}
