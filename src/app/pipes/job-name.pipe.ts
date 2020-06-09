import {Pipe, PipeTransform} from '@angular/core';
import {Job} from '../interface/vo/job';

@Pipe({name: 'jobNamePipe'})
export class JobNamePipe implements PipeTransform {
  transform(value: number, jobList: Job[]): string {
    let jobName: string;
    if (value !== null) {
      const index = jobList.findIndex(item => item.id === value);
      jobName = jobList[index].jobName;
    } else {
      jobName = '暂无职务';
    }
    return jobName;
  }
}
