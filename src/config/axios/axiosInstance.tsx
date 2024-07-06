import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
  createNavigationContainerRef,
  useNavigation,
} from '@react-navigation/native';
import {removeJSessionID} from '@services/asyncStorage/jsessionID';
import {storeMessageModal} from '@services/asyncStorage/messageModal';
import {language} from '@config/language';
import {IRootStackParamList} from '@routes/navigator';

export const navigationRef =
  createNavigationContainerRef<IRootStackParamList>();

export function navigate(name: keyof IRootStackParamList, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  // baseURL: 'http://srv550152.hstgr.cloud:9001/api/v1',
  // baseURL: 'http://srv550152.hstgr.cloud:9001/api/v1',
  // baseURL: 'http://91.108.104.57/api/v1',
  headers: {'Content-Type': 'application/json'},
  withCredentials: false,
});

axiosInstance.interceptors.response.use(
  async response => {
    const storedSessionId = await AsyncStorage.getItem('JSESSIONID'); //cc frontend
    const setCookieHeader = response.headers['set-cookie']; // cc backend

    if (response.status === 403) {
      await removeJSessionID();
      await storeMessageModal(language.vn.expired_time);
      navigate('Login');
    }
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
  },
  error => {
    console.log('Response Error:', error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.request.use(
  async config => {
    const storedSessionId = await AsyncStorage.getItem('JSESSIONID'); //
    if (storedSessionId) {
      config.headers.Cookie = `JSESSIONID=${storedSessionId}`;
    }
    return config;
  },

  error => {
    Promise.reject(error);
  },
);
