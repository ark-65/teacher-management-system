import {Pageable} from './pageable';
import {Department} from './department';
import {Job} from './job';
import {JobTitle} from './jobTitle';

export interface TeacherPageVo {
  code: number;
  msg: string;
  data: {
    teacherPage: Pageable;
    department: Department[];
    job: Job[];
    jobTitle: JobTitle[];
  };
}
