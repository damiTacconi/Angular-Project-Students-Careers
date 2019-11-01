import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddStudentComponent } from "./components/add-student/add-student.component";
import { ListStudentsComponent } from './components/list-students/list-students.component';
import { ListCareersComponent } from './components/list-careers/list-careers.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { ModifyStudentComponent } from './components/modify-student/modify-student.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: "students/add", component: AddStudentComponent, canActivate: [AuthGuard] },
  { path: "students", component: ListStudentsComponent, canActivate: [AuthGuard] },
  { path: "careers", component: ListCareersComponent, canActivate: [AuthGuard] },
  { path: "students/:id", component: StudentDetailsComponent, canActivate: [AuthGuard] },
  { path: "students/:id/modify", component: ModifyStudentComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "**", redirectTo: "login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
