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
