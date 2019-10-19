import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = "https://utn2019-avanzada2-tp8.herokuapp.com/api/";
  private urlLogin: string = "login";
  private urlSingUp: string = "sing-up";

  User: User = null;

  constructor() { }



}
