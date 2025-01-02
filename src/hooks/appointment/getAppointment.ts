// getAppointmentByConversationId

import {getData} from '@config/api'
import {apiPath} from '@config/api/apiPath'
import {IResponse} from '@interface/api.interface'
import {useQuery} from '@tanstack/react-query'

type tAppointment = {
  appointmentDate: string
  appointmentId: number
  content: string
  conversationId: number
  doctorId: string
  endTime: string
  note: string
  startTime: string
  status: string
  userId: string
}
type useGetAppointmentResponse = IResponse<tAppointment>
export const useGetAppointment = () => {
  const url = apiPath.appointment.GET_APPOINTMENT
  return useQuery<useGetAppointmentResponse>({
    queryKey: ['usGetAppointments'],
    queryFn: () => getData<useGetAppointmentResponse>(url),
    gcTime: 0,
  })
}

export const useGetAppointmentFalse = () => {
  const url = apiPath.appointment.GET_APPOINTMENT
  return useQuery<useGetAppointmentResponse>({
    queryKey: ['useGetAppointmentFalse'],
    queryFn: () => getData<useGetAppointmentResponse>(url),
    gcTime: 0,
    enabled: false,
  })
}
