import {getData, mutationPost} from '@config/api';
import {apiPath} from '@config/api/apiPath';
import {IResponse} from '@interface/api.interface';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {tListQuestionResponse} from '.';
import {tListResultItem} from '@screens/HomeTab/Profile/ProfileMultipleChoice/components/SurveyDetail_Answer';
import queryString from 'query-string';
import {tQuestionResponse} from './question.interface';

type tSaveQuestionRequest = tListResultItem;
//
export const useSaveDetailSurvey = (idSurvey: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    //Using question from backend
    mutationFn: (params: tSaveQuestionRequest[]) => {
      const filter = params.map(item => {
        const {numberKey, ...rs} = item;
        return rs;
      });
      return mutationPost<IResponse<any>>({
        url: apiPath.specialized_response_controller.SAVE,
        body: filter,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['usGetAppointments']});
      await queryClient.invalidateQueries({queryKey: ['useCurrentUser']});
      //In the future -> have many detail survey, idSurvey maybe needed
      // await queryClient.invalidateQueries({
      //   queryKey: ['useGetListQuestionById', idSurvey],
      // });
      // await queryClient.refetchQueries({
      //   queryKey: ['getLatestDetailSurveyAnswer'],
      // });
    },
  });
};

export const useGetLatestDetailSurveyAnswer = () => {
  const url = queryString.stringifyUrl(
    {
      url: apiPath.specialized_response_controller.GET_LATEST_RESULT,
    },
    {arrayFormat: 'comma'},
  );
  return useQuery<IResponse<tQuestionResponse[]>>({
    queryKey: ['getLatestDetailSurveyAnswer'],
    queryFn: () => getData<IResponse<tQuestionResponse[]>>(url),
  });
};

// export const useListResponse = () => {
//   const url = queryString.stringifyUrl(
//     {
//       url: apiPath.response.GET,
//     },
//     {arrayFormat: 'comma'},
//   );
//   return useQuery<IResponse<tResponse[]>>({
//     queryKey: ['useListResponse'],
//     queryFn: () => getData<IResponse<tResponse[]>>(url),
//     gcTime: 5000,
//     // enabled: false,
//   });
// };
