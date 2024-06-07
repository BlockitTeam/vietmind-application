import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

export const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.40:9001/api/v1/',
  headers: {'Content-Type': 'application/json'},
  withCredentials: false,
});

axiosInstance.interceptors.response.use(async response => {
  const storedSessionId = await AsyncStorage.getItem('JSESSIONID'); //cc frontend
  const setCookieHeader = response.headers['set-cookie']; // cc backend
  if (setCookieHeader) {
    const jSessionId = setCookieHeader.find(cookie =>
      cookie.startsWith('JSESSIONID='),
    );
    if (jSessionId) {
      const sessionIdValue = jSessionId.split(';')[0].split('=')[1];
      if (jSessionId !== storedSessionId) {
        await AsyncStorage.setItem('JSESSIONID', sessionIdValue); // cc hết hạn
      }
    }
  }

  return response;
});

axiosInstance.interceptors.request.use(
  async config => {
    const storedSessionId = await AsyncStorage.getItem('JSESSIONID'); //
    if (storedSessionId) {
      config.headers.Cookie = `JSESSIONID=${storedSessionId}`;
    }
    return config;
  },

  error => Promise.reject(error),
);
