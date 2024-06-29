export type tUserResponse = {
  birthYear: string | null;
  enabled: boolean;
  firstName: string | null;
  gender: string | null;
  id: string;
  lastName: string | null;
  password: string | null;
  provider: string;
  surveyCompleted: boolean;
  roles: string[];
  username: string;
};
export type tPutEditUserParam = {
  firstName: string;
  lastName: string;
  birthYear: number;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
};

export type tDoctorResponse = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  birthYear: number;
  gender: string;
  // conversationId: null;
};
