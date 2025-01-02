export enum eStatusAppointment {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}
export type StatusAppointmentType = 'PENDING' | 'CONFIRMED' | 'CANCELLED';

export type tAppointment = {
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
