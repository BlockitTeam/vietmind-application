import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {removeJSessionID} from '@services/asyncStorage/jsessionID';
import {storeMessageModal} from '@services/asyncStorage/messageModal';
import {language} from '@config/language';
import {createNavigationContainerRef} from '@react-navigation/native';
import {IRootStackParamList} from '@routes/navigator'; // adjust the path to where IRootStackParamList is defined
import {navigationRef} from 'App';
import {vietmindStore} from '@services/jotaiStorage';
import {curUserAtom} from '@services/jotaiStorage/curUserAtom';

export const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {'Content-Type': 'application/json'},
  withCredentials: false,
});

axiosInstance.interceptors.response.use(
  async response => {
    const storedSessionId = await AsyncStorage.getItem('JSESSIONID');
    const setCookieHeader = response.headers['set-cookie'];
    // await removeJSessionID();
    // await storeMessageModal(language.vn.expired_time);
    if (setCookieHeader) {
      const jSessionId = setCookieHeader.find(cookie =>
        cookie.startsWith('JSESSIONID='),
      );
      if (jSessionId) {
        const sessionIdValue = jSessionId.split(';')[0].split('=')[1];
        await AsyncStorage.setItem('JSESSIONID', sessionIdValue);
      }
    }
    return response;
  },
  async error => {
    console.log('~ response error:', error);
    if (error.response?.status === 403 || error.response?.status === 401) {
      console.log('Handle 403 ');
      await removeJSessionID();
      await storeMessageModal(language.vn.expired_time);
      vietmindStore.set(curUserAtom, undefined);
      // navigationRef.navigate('Login');
    }
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.request.use(
  async config => {
    const storedSessionId = await AsyncStorage.getItem('JSESSIONID');
    console.log(storedSessionId);
    if (storedSessionId) {
      config.headers.Cookie = `JSESSIONID=${storedSessionId}`;
    }
    return config;
  },
  error => {
    console.log(error, 'Request error');
    return Promise.reject(error);
  },
);
