import {Pageable} from './pageable';
import {TeacherInfo} from './teacherInfo';

export interface EduExperiencePageVo{
  code: number;
  msg: string;
  data: {
    eduPage: Pageable;
    teachers: TeacherInfo[];
  };
}
