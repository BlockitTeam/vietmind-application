// /api/v1/appointments
// updateAppointment

import {mutationPut} from '@config/api';
import {apiPath} from '@config/api/apiPath';
import {IResponse} from '@interface/api.interface';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {tAppointment} from './appointment.interface';

type tCreateAppointmentParams = Omit<
  tAppointment,
  'appointmentId' | 'conversationId'
>;
export type tCreateAppointmentResponse = {
  id: string;
  username: string; // gmail
  firstName: string;
  lastName: string;
  birthYear: number;
  gender: string;
  workplace: string;
  degree: string;
  specializations: string;
};

export const createAppointmentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postAppointmentParams: tCreateAppointmentParams) => {
      return mutationPut<IResponse<tCreateAppointmentResponse>>({
        url: `${apiPath.appointment.CREATE}`,
        body: postAppointmentParams,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['useGetAppointmentFalse'],
      });
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
