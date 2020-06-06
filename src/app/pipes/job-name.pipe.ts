import {Pipe, PipeTransform} from '@angular/core';
import {Job} from '../interface/vo/job';

@Pipe({name: 'jobNamePipe'})
export class JobNamePipe implements PipeTransform {
  transform(value: number, jobList: Job[]): string {
    let jobName: string;
    if (value !== null) {
      for (const item of jobList) {
        if (value === item.id) {
          jobName = item.jobName;
          break;
        }
      }
    } else {
      jobName = '暂无职务';
    }
    return jobName;
  }
}
