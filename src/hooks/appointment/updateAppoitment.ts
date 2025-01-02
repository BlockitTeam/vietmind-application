// /api/v1/appointments
// updateAppointment

import {mutationPut} from '@config/api'
import {apiPath} from '@config/api/apiPath'
import {IResponse} from '@interface/api.interface'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {tAppointment} from './appointment.interface'

//   }
export const useUpdateAppointment = () => {
  return useMutation({
    mutationFn: (putAppointmentParams: tAppointment) => {
      return mutationPut<IResponse<tAppointment>>({
        url: `${apiPath.appointment.PUT}`,
        body: putAppointmentParams,
      })
    },
  })
}

export const useUpdateAppointmentStatus = () => {
  return useMutation({
    mutationFn: (
      putAppointmentStatusParams: Pick<
        tAppointment,
        'appointmentId' | 'status' | 'content'
      >,
    ) => {
      return mutationPut<IResponse<tAppointment>>({
        url: `${apiPath.appointment.PUT}`,
        body: putAppointmentStatusParams,
      })
    },
  })
}
