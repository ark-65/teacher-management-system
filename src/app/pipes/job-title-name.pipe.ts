import {Pipe, PipeTransform} from '@angular/core';
import {JobTitle} from '../interface/vo/jobTitle';

@Pipe({name: 'jobTitleNamePipe'})
export class JobTitleNamePipe implements PipeTransform {
  transform(value: number, jobTitleList: JobTitle[]): string {
    let jobTitleName: string;
    if (value !== null) {
      for (const item of jobTitleList) {
        if (value === item.id) {
          jobTitleName = item.jobTitleName;
          break;
        }
      }
    } else {
      jobTitleName = '暂无职称';
    }
    return jobTitleName;
  }
}
