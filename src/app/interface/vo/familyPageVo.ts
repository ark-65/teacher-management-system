import {Pageable} from './pageable';
import {TeacherInfo} from './teacherInfo';

export interface FamilyPageVo {
  code: number;
  msg: string;
  data: {
    familyPage: Pageable;
    teachers: TeacherInfo[];
  };
}
