export type tProvider = 'facebook' | 'google';

export type tLoginParam = {
  token: string;
  provider: tProvider;
};
