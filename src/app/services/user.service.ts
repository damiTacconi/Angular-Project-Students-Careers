import { Injectable } from '@angular/core';
import { User } from '../models/user';

import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = "https://utn2019-avanzada2-tp8.herokuapp.com/";
  private urlLogin: string = `${this.url}login`;
  private urlSingUp: string = `${this.url}sign-up`;

  user: User = null;

  constructor(private http: HttpClient) { }

  signUp(user: User): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    return this.http.post(this.urlSingUp, user, httpOptions).toPromise()
  }

  public get logIn(): boolean {
    return (localStorage.getItem('token') !== null);
  }

  login(user: User): Promise<any> {
    return this.http.post(this.urlLogin, user, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json'),
      observe: 'response'
    }
    ).toPromise().then(h => h.body)
  }

}
