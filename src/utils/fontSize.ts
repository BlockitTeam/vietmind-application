import {Dimensions, PixelRatio} from 'react-native'

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window')
const BASE_WIDTH = 375 // iPhone 11 Pro dimensions

const scale = SCREEN_WIDTH / BASE_WIDTH

export function normalizeFontSize(size: number) {
  const newSize = size * scale
  return Math.round(PixelRatio.roundToNearestPixel(newSize))
}
