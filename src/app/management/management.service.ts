import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from '../interface/page';
import {Department} from '../interface/vo/department';
import {DataVo} from '../interface/dataVo';
import {PageDataVo} from '../interface/pageDataVo';
import {JobTitle} from '../interface/vo/jobTitle';
import {Job} from '../interface/vo/job';
import {TeacherInfo} from '../interface/vo/teacherInfo';
import {RapRecord} from '../interface/vo/rapRecord';
import {EduExperienceInfo} from '../interface/vo/eduExperienceInfo';
import {TeacherFamilyMember} from '../interface/vo/teacherFamilyMember';
import {TeacherPageVo} from '../interface/vo/teacherPageVo';
import {EduExperiencePageVo} from '../interface/vo/eduExperiencePageVo';
import {FamilyPageVo} from '../interface/vo/familyPageVo';
import {RapRecordPageVo} from '../interface/vo/rapRecordPageVo';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  api = 'http://localhost:8080/api/v1';
  constructor(private http: HttpClient) {}

  /**
   * 部门管理
   * @param department:Department
   */
  addDepartment(department: Department): Observable<DataVo> {
    return this.http.put<DataVo>(`${this.api}/department`, department);
  }
  deleteDepartment(id: number): Observable<DataVo> {
    return this.http.delete<DataVo>(`${this.api}/department?id=${id}`);
  }

  updateDepartment(department: Department): Observable<DataVo> {
    return this.http.patch<DataVo>(`${this.api}/department`, department);
  }

  getDepartment(page: Page): Observable<PageDataVo> {
    const pageNumber = page.number;
    const pageSize = page.size;
    return this.http.get<PageDataVo>(`${this.api}/department?page=${pageNumber}&size=${pageSize}&sort=id,asc`);
  }

  /**
   * 职称管理
   */
  addJobTitle(jobTitle: JobTitle): Observable<DataVo> {
    return this.http.put<DataVo>(`${this.api}/job-title`, jobTitle);
  }
  deleteJobTitle(id: number): Observable<DataVo> {
    return this.http.delete<DataVo>(`${this.api}/job-title?id=${id}`);
  }
  updateJobTitle(jobTitle: JobTitle): Observable<DataVo> {
    return this.http.patch<DataVo>(`${this.api}/job-title`, jobTitle);
  }
  getJobTitle(page: Page): Observable<PageDataVo> {
    const pageNumber = page.number;
    const pageSize = page.size;
    return this.http.get<PageDataVo>(`${this.api}/job-title?page=${pageNumber}&size=${pageSize}&sort=id,asc`);
  }

  /**
   * 职务管理
   */
  addJob(job: Job): Observable<DataVo> {
    return this.http.put<DataVo>(`${this.api}/job`, job);
  }
  deleteJob(id: number): Observable<DataVo> {
    return this.http.delete<DataVo>(`${this.api}/job?id=${id}`);
  }
  updateJob(job: Job): Observable<DataVo> {
    return this.http.patch<DataVo>(`${this.api}/job`, job);
  }
  getJob(page: Page): Observable<PageDataVo> {
    const pageNumber = page.number;
    const pageSize = page.size;
    return this.http.get<PageDataVo>(`${this.api}/job?page=${pageNumber}&size=${pageSize}&sort=id,asc`);
  }

  /**
   * 教师信息管理
   */
  addTeacherInfo(teacherInfo: TeacherInfo): Observable<DataVo> {
    return this.http.put<DataVo>(`${this.api}/teacher-info`, teacherInfo);
  }
  deleteTeacherInfo(id: number): Observable<DataVo> {
    return this.http.delete<DataVo>(`${this.api}/teacher-info?id=${id}`);
  }
  updateTeacherInfo(teacherInfo: TeacherInfo): Observable<DataVo> {
    return this.http.patch<DataVo>(`${this.api}/teacher-info`, teacherInfo);
  }
  getTeacherInfo(page: Page): Observable<TeacherPageVo> {
    const pageNumber = page.number;
    const pageSize = page.size;
    return this.http.get<TeacherPageVo>(`${this.api}/teacher-info?page=${pageNumber}&size=${pageSize}&sort=id,asc`);
  }

  /**
   * 教师家庭关系
   */
  addTeacherFamily(teacherFamilyMember: TeacherFamilyMember): Observable<DataVo> {
    return this.http.put<DataVo>(`${this.api}/teacher-family`, teacherFamilyMember);
  }
  deleteTeacherFamily(id: number): Observable<DataVo> {
    return this.http.delete<DataVo>(`${this.api}/teacher-family?id=${id}`);
  }
  updateTeacherFamily(teacherFamilyMember: TeacherFamilyMember): Observable<DataVo> {
    return this.http.patch<DataVo>(`${this.api}/teacher-family`, teacherFamilyMember);
  }
  getTeacherFamily(page: Page): Observable<FamilyPageVo> {
    const pageNumber = page.number;
    const pageSize = page.size;
    return this.http.get<FamilyPageVo>(`${this.api}/teacher-family?page=${pageNumber}&size=${pageSize}&sort=id,asc`);
  }
  /**
   * 教师教育经历管理
   */
  addEduExperience(eduExperienceInfo: EduExperienceInfo): Observable<DataVo> {
    return this.http.put<DataVo>(`${this.api}/edu-experience`, eduExperienceInfo);
  }
  deleteEduExperience(id: number): Observable<DataVo> {
    return this.http.delete<DataVo>(`${this.api}/edu-experience?id=${id}`);
  }
  updateEduExperience(eduExperienceInfo: EduExperienceInfo): Observable<DataVo> {
    return this.http.patch<DataVo>(`${this.api}/edu-experience`, eduExperienceInfo);
  }
  getEduExperience(page: Page): Observable<EduExperiencePageVo> {
    const pageNumber = page.number;
    const pageSize = page.size;
    return this.http.get<EduExperiencePageVo>(`${this.api}/edu-experience?page=${pageNumber}&size=${pageSize}&sort=id,asc`);
  }
  /**
   * 教师奖惩管理
   */
  addRapRecord(rapRecord: RapRecord): Observable<DataVo> {
    return this.http.put<DataVo>(`${this.api}/rap-record`, rapRecord);
  }
  deleteRapRecord(id: number): Observable<DataVo> {
    return this.http.delete<DataVo>(`${this.api}/rap-record?id=${id}`);
  }
  updateRapRecord(rapRecord: RapRecord): Observable<DataVo> {
    return this.http.patch<DataVo>(`${this.api}/rap-record`, rapRecord);
  }
  getRapRecord(page: Page): Observable<RapRecordPageVo> {
    const pageNumber = page.number;
    const pageSize = page.size;
    return this.http.get<RapRecordPageVo>(`${this.api}/rap-record?page=${pageNumber}&size=${pageSize}&sort=id,asc`);
  }
}
