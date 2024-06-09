export interface IResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}
export interface IGetDataWithParam<T> {
  url: string;
  params: T;
}

export interface IPaging {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export interface IListItemPaging<T> extends IPaging {
  items: T[];
}

export type IMutation<T> = {
  url: string;
  body: T;
};
