import {apiPath} from '@config/api/apiPath'
import {IResponse} from '@interface/api.interface'
import {useQuery} from '@tanstack/react-query'
import {tQuestionResponse} from './question.interface'
import {getData} from '@config/api'

export type tListQuestionResponse = IResponse<tQuestionResponse[]>

export const useGetListQuestion = () => {
  const url = apiPath.question.GET
  return useQuery<tListQuestionResponse>({
    queryKey: ['useGetListQuestion'],
    queryFn: () => {
      return getData(url)
    },
  })
}

export const useGetListQuestionById = (id: string | number) => {
  const url = apiPath.question.GET_LIST_BY_ID.replace('{id}', id.toString())
  return useQuery<tListQuestionResponse>({
    queryKey: ['useGetListQuestionById', id],
    queryFn: () => {
      return getData(url)
    },
  })
}
