import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import { LoginComponent } from './login/login.component';
import { ManagementComponent } from './management/management.component';
import { DepartmentComponent } from './management/department/department.component';
import { JobTitleComponent } from './management/job-title/job-title.component';
import { JobComponent } from './management/job/job.component';
import { TeacherInfoComponent } from './management/teacher-info/teacher-info.component';
import { TeacherFamilyInfoComponent } from './management/teacher-family-info/teacher-family-info.component';
import { EduExperienceInfoComponent } from './management/edu-experience-info/edu-experience-info.component';
import { RapRecordComponent } from './management/rap-record/rap-record.component';
import {DepartmentNamePipe} from './pipes/department-name.pipe';
import {JobTitleNamePipe} from './pipes/job-title-name.pipe';
import {JobNamePipe} from './pipes/job-name.pipe';
import {TeacherNamePipe} from './pipes/teacher-name.pipe';

registerLocaleData(zh);

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ManagementComponent,
        DepartmentComponent,
        JobTitleComponent,
        JobComponent,
        TeacherInfoComponent,
        TeacherFamilyInfoComponent,
        EduExperienceInfoComponent,
        RapRecordComponent,
        DepartmentNamePipe,
        JobTitleNamePipe,
        JobNamePipe,
        TeacherNamePipe
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NgZorroAntdModule,
        ReactiveFormsModule
    ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
