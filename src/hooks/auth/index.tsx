import {axiosInstance} from '@axios';
import axios from 'axios';

// 'http://localhost:9001',

export const useLogin = async (
  tokenOAuth: string,
  provider: 'facebook' | 'google',
) => {
  return await axiosInstance.post('/api/v1/auth', {
    token: tokenOAuth,
    provider,
  });
};
export const useCurrentUser = async () => {
  const rs = await axiosInstance.get('/api/v1/user/current-user');
  return rs;
};

export const useGetQuestion = async () => {
  const rs = await axiosInstance.get('/api/v1/question');
  return rs;
};
