
export interface PageDataVo {
  code: number;
  msg: string;
  data: {
    content: any;
    empth: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: object;
    size: number;
    sort: object;
    totalElements: number;
    totalPages: number;
  };
}
