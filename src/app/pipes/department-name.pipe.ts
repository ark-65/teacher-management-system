import {Pipe, PipeTransform} from '@angular/core';
import {Department} from '../interface/vo/department';

@Pipe({name: 'departmentNamePipe'})
export class DepartmentNamePipe implements PipeTransform {
  transform(value: number, departmentList: Department[]): string {
    let departmentName: string;
    if (value !== null) {
      for (const item of departmentList) {
        if (value === item.id) {
          departmentName = item.departmentName;
          break;
        }
      }
    } else {
      departmentName = '暂无部门';
    }
    return departmentName;
  }
}
