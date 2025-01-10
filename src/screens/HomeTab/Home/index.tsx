import React from 'react'
import {ScrollView, VStack} from 'native-base'

import HeaderLayout from '@components/layout/Header'

import IncomingAdvise from './component/IncomingAdvise'
import HistoryAdvise from './component/HistoryAdvise'
import {CompositeScreenProps} from '@react-navigation/native'
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs'
import {IBottomParamList, IRootStackParamList} from '@routes/navigator'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
export type Tab_HomeProps = CompositeScreenProps<
  BottomTabScreenProps<IBottomParamList, 'Home'>,
  NativeStackScreenProps<IRootStackParamList>
>
const Tab_Home: React.FC<Tab_HomeProps> = (props) => {
  return (
    <HeaderLayout title="Trang chủ">
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack flex={1} space={4} w={'100%'} minHeight={'100%'} pt={4} pb={4}>
          <IncomingAdvise />
          <HistoryAdvise route={props.route} navigation={props.navigation} />
        </VStack>
      </ScrollView>
    </HeaderLayout>
  )
}
export default Tab_Home
