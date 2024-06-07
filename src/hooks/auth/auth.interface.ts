export type tProvider = 'facebook' | 'google';

export type tLoginParam = {
  token: string;
  provider: tProvider;
};

export type tUserResponse = {
  birthYear: string | null;
  enabled: boolean;
  firstName: string | null;
  gender: string | null;
  id: number;
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
