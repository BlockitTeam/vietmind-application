// getAppointmentByConversationId

import {getData} from '@config/api';
import {apiPath} from '@config/api/apiPath';
import {IResponse} from '@interface/api.interface';
import {useQuery} from '@tanstack/react-query';
import {StatusAppointmentType, tAppointment} from './appointment.interface';

type tGetAppointmentByIdParams = {
  conversation_id: string;
};

type useGetAppointmentResponse = IResponse<tAppointment>;
export const usGetAppointmentById = (conversationId: string) => {
  const url = apiPath.appointment.GET_BY_CONVERSATION_ID.replace(
    '{conversation_id}',
    conversationId,
  );
  return useQuery<useGetAppointmentResponse>({
    queryKey: ['usGetAppointmentByIdParams', conversationId],
    queryFn: () => getData<useGetAppointmentResponse>(url),
    gcTime: 0,
  });
};
