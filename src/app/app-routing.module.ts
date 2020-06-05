import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ManagementComponent} from './management/management.component';
import {DepartmentComponent} from './management/department/department.component';
import {JobTitleComponent} from './management/job-title/job-title.component';
import {JobComponent} from './management/job/job.component';
import {TeacherInfoComponent} from './management/teacher-info/teacher-info.component';
import {TeacherFamilyInfoComponent} from './management/teacher-family-info/teacher-family-info.component';
import {EduExperienceInfoComponent} from './management/edu-experience-info/edu-experience-info.component';
import {RapRecordComponent} from './management/rap-record/rap-record.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'management', component: ManagementComponent, children: [
      {path: '', redirectTo: 'department', pathMatch: 'full'},
      {path: 'department', component: DepartmentComponent, data: {breadcrumb: '部门管理'}},
      {path: 'job-title', component: JobTitleComponent, data: {breadcrumb: '职称管理'}},
      {path: 'job', component: JobComponent, data: {breadcrumb: '职务管理'}},
      {path: 'teacher-info', component: TeacherInfoComponent, data: {breadcrumb: '教师信息管理'}},
      {path: 'family', component: TeacherFamilyInfoComponent, data: {breadcrumb: '教师家庭关系管理'}},
      {path: 'edu-experience', component: EduExperienceInfoComponent, data: {breadcrumb: '教师教育经历管理'}},
      {path: 'rap-record', component: RapRecordComponent, data: {breadcrumb: '教师奖惩管理'}},
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
