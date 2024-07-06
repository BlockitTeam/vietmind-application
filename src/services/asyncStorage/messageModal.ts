// AsyncStorage.getItem('JSESSIONID').then(v => {

import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeMessageModal = async (messageModal: string) => {
  try {
    await AsyncStorage.setItem('messageModal', messageModal);
    return;
  } catch (e) {
    return 'Saving MessageModal Error';
  }
};
export const getMessageModal = async () => {
  try {
    const value = await AsyncStorage.getItem('messageModal');
    return value;
  } catch (e) {
    return undefined;
  }
};
export const removeMessageModal = async () => {
  try {
    const value = await AsyncStorage.removeItem('messageModal');
    return value;
  } catch (e) {
    return undefined;
  }
};
