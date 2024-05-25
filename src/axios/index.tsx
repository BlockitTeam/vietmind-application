import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'http://localhost:9001/api',
  headers: {'X-Custom-Header': 'token'},
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  async response => {
    const storedSessionId = await AsyncStorage.getItem('JSESSIONID'); //cc frontend
    const setCookieHeader = response.headers['set-cookie']; // cc backend
    if (setCookieHeader) {
      const jSessionId = setCookieHeader.find(cookie =>
        cookie.startsWith('JSESSIONID='),
      );
      if (jSessionId) {
        const sessionIdValue = jSessionId.split(';')[0].split('=')[1];
        if (jSessionId !== storedSessionId)
          await AsyncStorage.setItem('JSESSIONID', sessionIdValue); // cc hết hạn
      }
    }

    return response;
  },
  error => Promise.reject(error),
);

axiosInstance.interceptors.request.use(
  async config => {
    const storedSessionId = await AsyncStorage.getItem('JSESSIONID');
    console.log(storedSessionId);
    if (storedSessionId) {
      config.headers.Cookie = `JSESSIONID=${storedSessionId}`;
    }
    console.log(config);
    return config;
  },
  error => Promise.reject(error),
);

export const useLogin = async (tokenOAuth: string) => {
  return await axiosInstance.post('/auth/token', {token: tokenOAuth});
};
export const useCurrentUser = async () => {
  return await axiosInstance.get('/v1/current-user');
};
