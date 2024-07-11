// /api/v1/appointments
// updateAppointment

import {mutationPut} from '@config/api';
import {apiPath} from '@config/api/apiPath';
import {IResponse} from '@interface/api.interface';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {tAppointment} from './appointment.interface';

//   }
export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (putAppointmentParams: tAppointment) => {
      console.log(JSON.stringify(putAppointmentParams));
      return mutationPut<IResponse<tAppointment>>({
        url: `${apiPath.appointment.PUT}`,
        body: putAppointmentParams,
      });
    },
  });
};
  