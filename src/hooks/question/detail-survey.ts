import {getData, mutationPost} from '@config/api'
import {apiPath} from '@config/api/apiPath'
import {IResponse} from '@interface/api.interface'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {tListResultItem} from '@screens/HomeTab/Profile/ProfileMultipleChoice/components/SurveyDetail_Answer'
import queryString from 'query-string'
import {tQuestionResponse} from './question.interface'

type tSaveQuestionRequest = tListResultItem
//
export const useSaveDetailSurvey = (_idSurvey: string | number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (params: tSaveQuestionRequest[]) => {
      const filter = params.map((item) => {
        const {numberKey, ...rs} = item
        return rs
      })
      return mutationPost<IResponse<any>>({
        url: apiPath.specialized_response_controller.SAVE,
        body: filter,
      })
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['usGetAppointments']})
      await queryClient.invalidateQueries({queryKey: ['useCurrentUser']})
    },
  })
}

export const useGetLatestDetailSurveyAnswer = () => {
  const url = queryString.stringifyUrl(
    {
      url: apiPath.specialized_response_controller.GET_LATEST_RESULT,
    },
    {arrayFormat: 'comma'},
  )
  return useQuery<IResponse<tQuestionResponse[]>>({
    queryKey: ['getLatestDetailSurveyAnswer'],
    queryFn: () => getData<IResponse<tQuestionResponse[]>>(url),
  })
}
