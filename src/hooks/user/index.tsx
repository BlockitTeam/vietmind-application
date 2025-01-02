import {apiPath} from '@config/api/apiPath'
import {IResponse} from '@interface/api.interface'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import queryString from 'query-string'
import {
  tDoctorResponse,
  tPutEditUserParam,
  tUserResponse,
} from './user.interface'
import {getData, mutationPut} from '@config/api'

export const useCurrentUser = () => {
  const url = queryString.stringifyUrl(
    {
      url: apiPath.user.GET_CURRENT_USER,
    },
    {arrayFormat: 'comma'},
  )
  return useQuery<IResponse<tUserResponse>>({
    queryKey: ['useCurrentUser'],
    queryFn: () => getData<IResponse<tUserResponse>>(url),
    gcTime: 0,
    enabled: false,
  })
}

export const usePutEditUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: tPutEditUserParam) => {
      return mutationPut<IResponse<tUserResponse>>({
        url: apiPath.user.PUT,
        body: {...body},
      })
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['useCurrentUser']})
    },
  })
}

type ListDoctorResponseType = IResponse<tDoctorResponse[]>
export const useGetListDoctor = () => {
  const url = queryString.stringifyUrl(
    {
      url: apiPath.user.GET_LIST_DOCTOR,
    },
    {arrayFormat: 'comma'},
  )
  return useQuery<ListDoctorResponseType>({
    queryKey: ['useGetListDoctor'],
    queryFn: () => getData<ListDoctorResponseType>('user/doctors'),
    gcTime: 0,
  })
}

// /api/v1/user/getDoctorById/1241

export const useGetDoctorById = (id?: string) => {
  return useQuery<IResponse<tDoctorResponse>>({
    queryKey: id ? ['useGetDoctorById', id] : ['useGetDoctorById'], // Query key includes the ID
    queryFn: () => {
      if (!id) {
        throw new Error('ID is undefined') // Defensive coding
      }
      const url = apiPath.user.GET_DOCTOR_ID.replace('{id}', id)
      return getData<IResponse<tDoctorResponse>>(url)
    },
    enabled: !!id, // Ensures query runs only when ID is defined
    gcTime: 2000,
  })
}
