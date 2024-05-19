import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeFirstLoad = async (value: '0' | '1') => {
  try {
    await AsyncStorage.setItem('firstTime', value);
    return value;
  } catch (e) {
    // saving error
    return '0';
  }
};
export const getFirstLoad = async () => {
  try {
    const value = await AsyncStorage.getItem('firstTime');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    return '0';
  }
};
