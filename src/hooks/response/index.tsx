import {apiPath} from '@config/api/apiPath';
import {IResponse} from '@interface/api.interface';
import {useMutation, useQuery} from '@tanstack/react-query';
import queryString from 'query-string';
import {tResponse, tResponseResult} from './response.interface';
import {getData, mutationPost} from '@config/api';
import {tQuestionResponse} from '@hooks/question/question.interface';

export const useListResponse = () => {
  const url = queryString.stringifyUrl(
    {
      url: apiPath.response.GET,
    },
    {arrayFormat: 'comma'},
  );
  return useQuery<IResponse<tResponse[]>>({
    queryKey: ['useListResponse'],
    queryFn: () => getData<IResponse<tResponse[]>>(url),
    gcTime: 5000,
    // enabled: false,
  });
};

export const useSaveSurveyResponse = () => {
  return useMutation({
    //Using question from backend
    mutationFn: (params: tQuestionResponse[]) =>
      mutationPost<IResponse<any>>({url: apiPath.response.POST, body: params}),
  });
};

export const useGetSurveyResponseResult = () => {
  return useQuery<IResponse<tResponseResult>>({
    queryKey: ['useGetSurveyResponseResult'],
    queryFn: () =>
      getData<IResponse<tResponseResult>>(apiPath.response.GET_RESULT),
    gcTime: 0,
  });
};
