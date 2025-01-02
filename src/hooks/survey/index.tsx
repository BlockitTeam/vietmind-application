import {getData} from '@config/api';
import {apiPath} from '@config/api/apiPath';
import {IResponse} from '@interface/api.interface';
import {useQuery} from '@tanstack/react-query';

export type TInfSurvey = {
  surveyId: number;
  title: string;
  description: string;
  priority: number;
  createdAt: string;
  updatedAt: string;
  questionCount: number;
};
export const useGetInfSurveyById = (id: number | string) => {
  const url = apiPath.survey.GET_BY_ID.replace('{id}', id.toString());
  return useQuery<IResponse<TInfSurvey>>({
    queryKey: ['useGetInfSurveyById', id],
    queryFn: () => {
      return getData(url);
    },
  });
};
