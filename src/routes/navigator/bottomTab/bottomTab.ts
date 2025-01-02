import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

export type IBottomParamList = {
  Home: undefined // Trang chủ
  Advise: undefined // Tư vấn
  Knowledge: undefined // Kiến thức
  Profile: undefined // Cá nhân
}

export const RootBottomTab = createBottomTabNavigator<IBottomParamList>()
