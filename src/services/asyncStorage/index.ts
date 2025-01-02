import AsyncStorage from '@react-native-async-storage/async-storage'

export const clearStore = async () => {
  try {
    await AsyncStorage.clear()
    return
  } catch (e) {
    return 'Clear Store Error'
  }
}
