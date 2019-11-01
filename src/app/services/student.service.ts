import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private url: string = "https://utn2019-avanzada2-tp8.herokuapp.com/api/students";
  private urlIdentities: string = `${this.url}/identities`;

  constructor(private http: HttpClient) { }

  validateDni(dni: string) {
    return this.http.get(this.urlIdentities, {
      params: {
        dni
      }
    })
  }
  validateEmail(email: string) {
    return this.http.get(this.urlIdentities, {
      params: {
        email
      }
    })
  }

  findAll(): Promise<any> {
    return this.http.get(this.url).toPromise();
  }

  findById(id: number): Promise<any> {
    return this.http.get(`${this.url}/${id}`).toPromise();
  }

  update(student: Student) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.http.patch(
      `${this.url}/${student.studentId}`
      , student
      , httpOptions).toPromise();
  }

  insert(student: Student) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('token')
      })
    };
    return this.http.post(this.url, student, httpOptions);
  }

}
