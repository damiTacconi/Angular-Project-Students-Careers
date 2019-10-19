import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { ListStudentsComponent } from './components/list-students/list-students.component';
import { HttpClientModule } from "@angular/common/http"
import { FormsModule } from "@angular/forms";
import { StudentService } from './services/student.service';
import { ListCareersComponent } from './components/list-careers/list-careers.component';
import { CareerService } from './services/career.service';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { ModifyStudentComponent } from './components/modify-student/modify-student.component';
import { ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AddStudentComponent,
    ListStudentsComponent,
    ListCareersComponent,
    StudentDetailsComponent,
    ModifyStudentComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [StudentService, CareerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
