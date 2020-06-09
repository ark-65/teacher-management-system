import {Pipe, PipeTransform} from '@angular/core';
import {JobTitle} from '../interface/vo/jobTitle';

@Pipe({name: 'jobTitleNamePipe'})
export class JobTitleNamePipe implements PipeTransform {
  transform(value: number, jobTitleList: JobTitle[]): string {
    let jobTitleName: string;
    if (value !== null) {
      const index = jobTitleList.findIndex(item => item.id === value);
      jobTitleName = jobTitleList[index].jobTitleName;
    } else {
      jobTitleName = '暂无职称';
    }
    return jobTitleName;
  }
}
