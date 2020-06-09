import {Pipe, PipeTransform} from '@angular/core';
import {TeacherInfo} from '../interface/vo/teacherInfo';

@Pipe({name: 'teacherNamePipe'})
export class TeacherNamePipe implements PipeTransform {
  transform(value: number, jobTitleList: TeacherInfo[]): string {
    let jobTitleName: string;
    if (value !== null) {
      const index = jobTitleList.findIndex(item => item.id === value);
      jobTitleName = jobTitleList[index].teacherName;
    } else {
      jobTitleName = '暂无职称';
    }
    return jobTitleName;
  }
}
