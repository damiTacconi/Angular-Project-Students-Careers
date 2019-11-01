import { Injectable } from '@angular/core';
import { User } from '../models/user';

import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = "https://utn2019-avanzada2-tp8.herokuapp.com/";
  private urlLogin: string = `${this.url}login`;
  private urlSingUp: string = `${this.url}sign-up`;
  private urlUserIdentities: string = `${this.url}users/identities`;

  urlRoute: string = '/';
  user: User = null;

  constructor(private http: HttpClient) { }

  signUp(user: User): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post(this.urlSingUp, user, httpOptions);;
  }

  public get logIn(): boolean {
    return (localStorage.getItem('token') !== null);
  }

  validateEmail(email: string = "myUserEmaiasdasdl@gmail.com") {
    return this.http.get(this.urlUserIdentities, {
      params: {
        email: email
      }
    })
  }
  login(user: User): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post(this.urlLogin, user, httpOptions);
  }

  logout() {
    localStorage.removeItem('token');
  }

}
