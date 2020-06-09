import {Pageable} from './pageable';
import {TeacherInfo} from './teacherInfo';

export interface RapRecordPageVo {
  code: number;
  msg: string;
  data: {
    rapRecordPage: Pageable;
    teachers: TeacherInfo[];
  };
}
