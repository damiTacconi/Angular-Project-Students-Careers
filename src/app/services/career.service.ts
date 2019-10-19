import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  private url: string = "https://utn2019-avanzada2-tp8.herokuapp.com/api/careers";

  constructor(private http: HttpClient) { }

  findAll(): Promise<any> {
    return this.http.get(this.url).toPromise();
  }

  findById(id): Promise<any> {
    return this.http.get(`${this.url}/${id}`).toPromise();
  }
}
