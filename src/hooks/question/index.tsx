import {apiPath} from '@config/api/apiPath';
import {IResponse} from '@interface/api.interface';
import {useQuery} from '@tanstack/react-query';
import {tQuestionResponse} from './question.interface';
import {getData} from '@config/api';

export type tListQuestionResponse = IResponse<tQuestionResponse[]>;

export const useGetListQuestion = () => {
  const url = apiPath.question.GET;
  return useQuery<tListQuestionResponse>({
    queryKey: ['useGetListQuestion'],
    queryFn: () => {
      return getData(url);
    },
  });
};


export const useGetStressSurvey = () => {
  const url = apiPath.question.GET_STRESS_SURVEY;
  return useQuery<tListQuestionResponse>({
    queryKey: ['useGetStressSurvey'],
    queryFn: () => {
      return getData(url);
    },
  });
};

export const useGetUnrestSurvey = () => {
  const url = apiPath.question.GET_UNREST_SURVEY;
  return useQuery<tListQuestionResponse>({
    queryKey: ['useGetUnrestSurvey'],
    queryFn: () => {
      return getData(url);
    },
  });
};