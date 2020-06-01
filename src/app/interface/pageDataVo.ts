import {DepartmentItem} from './departmentItem';

export interface PageDataVo {
  code: number;
  msg: string;
  data: {
    content: any;
    empth: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElement: number;
    pageable: object;
    size: number;
    sort: object;
    totalElements: number;
    totalPages: number;
  };
}
