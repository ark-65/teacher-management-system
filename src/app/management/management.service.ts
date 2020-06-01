import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from '../interface/page';
import {Department} from '../interface/department';
import {DataVo} from '../interface/dataVo';
import {PageDataVo} from '../interface/pageDataVo';
import {DepartmentItem} from '../interface/departmentItem';

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

  updateDepartment(department: DepartmentItem): Observable<DataVo> {
    return this.http.patch<DataVo>(`${this.api}/department`, department);
  }

  getDepartment(page: Page): Observable<PageDataVo> {
    const pageNumber = page.number;
    const pageSize = page.size;
    return this.http.get<PageDataVo>(`${this.api}/department?page=${pageNumber}&size=${pageSize}&sort=id,asc`);
  }
}
