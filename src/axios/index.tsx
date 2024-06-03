import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';


export const axiosInstance = axios.create({
  baseURL: 'http://172.25.37.162:9001',
  // headers: {'X-Custom-Header': 'token'},
  // withCredentials: true,
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
    // const randomNumber = Math.random();
    // console.log('response: ', response);
    // let a = Math.floor(randomNumber * 2) + 402;
    // if (a === 403) {
    //   const navigation = useNavigation();
    //   await AsyncStorage.removeItem('JSESSIONID'); //cc frontend
    //   // navigation.navigate('');
    // }
    return response;
  },

  // error => Promise.reject(error),
);

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
