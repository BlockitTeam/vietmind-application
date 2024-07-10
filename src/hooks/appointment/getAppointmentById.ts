// getAppointmentByConversationId

import {getData} from '@config/api';
import {apiPath} from '@config/api/apiPath';
import {IResponse} from '@interface/api.interface';
import {useQuery} from '@tanstack/react-query';
import {StatusAppointmentType} from '.';

type tGetAppointmentByIdParams = {
  conversation_id: string;
};

type Appointment = {
  appointmentId: number;
  userId: string;
  doctorId: string;
  conversationId: number;
  content: string;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  note: string;
  status: StatusAppointmentType;
};

type useGetAppointmentResponse = IResponse<Appointment>;
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
