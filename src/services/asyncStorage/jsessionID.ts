// AsyncStorage.getItem('JSESSIONID').then(v => {

import AsyncStorage from '@react-native-async-storage/async-storage'

export const storeJSessionID = async (jSessionID: string) => {
  try {
    await AsyncStorage.setItem('JSESSIONID', jSessionID)
    return
  } catch (e) {
    return 'Saving JSESSIONID Error'
  }
}
export const getJSessionID = async () => {
  try {
    const value = await AsyncStorage.getItem('JSESSIONID')
    return value
  } catch (e) {
    return undefined
  }
}
export const removeJSessionID = async () => {
  try {
    const value = await AsyncStorage.removeItem('JSESSIONID')
    return value
  } catch (e) {
    return undefined
  }
}
