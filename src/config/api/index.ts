import {axiosInstance} from '../axios/axiosInstance';
import {IGetDataWithParam, IMutation} from '../../interface/api.interface';

export async function getData<T>(url: string): Promise<T> {
  return await axiosInstance.get(url).then(response => {
    return {
      data: response.data,
      statusCode: response.status,
    } as T;
  });
}

export async function getDataWithParams<T, P>(
  obj: IGetDataWithParam<P>,
): Promise<T> {
  const {url, params} = obj;
  const data = await axiosInstance.get(url, {params}).then(response => {
    return {
      data: response.data,
      statusCode: response.status,
    } as T;
  });

  return data;
}

export async function mutationPost<T>(obj: IMutation<object>): Promise<T> {
  const {url, body} = obj;

  return await axiosInstance.post(url, body).then(response => {
    return {
      data: response.data,
      statusCode: response.status,
    } as T;
  });
}

export async function mutationPut<T>(params: IMutation<object>): Promise<T> {
  const response = await axiosInstance.put(params.url, params.body);
  return {
    data: response.data,
    statusCode: response.status,
  } as T;
}

export async function mutationDelete<T, P>(obj: IMutation<P>): Promise<T> {
  const {url, body} = obj;
  return await axiosInstance
    .delete(url, {data: body})
    .then(response => response.data as T);
}
