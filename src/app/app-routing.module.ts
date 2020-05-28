import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ManagementComponent} from './management/management.component';
import {StudentManagementComponent} from './management/student-management/student-management.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'management', component: ManagementComponent, data: {breadcrumb: 'management'}, children: [
      {path: '', redirectTo: 'student', pathMatch: 'full'},
      {path: 'student', component: StudentManagementComponent, data: {breadcrumb: 'student'}}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
