// getAppointmentByConversationId

import {getData} from '@config/api'
import {apiPath} from '@config/api/apiPath'
import {IResponse} from '@interface/api.interface'
import {useQuery} from '@tanstack/react-query'
import {tAppointment} from './appointment.interface'

type useGetAppointmentFinishResponse = IResponse<tAppointment[]>
export const useGetAppointmentFinish = () => {
  const url = apiPath.appointment.GET_FINISHED
  return useQuery<useGetAppointmentFinishResponse>({
    queryKey: ['useGetAppointmentFinish'],
    queryFn: () => getData<useGetAppointmentFinishResponse>(url),
    gcTime: 0,
  })
}
