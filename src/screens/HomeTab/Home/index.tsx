import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {
  Box,
  Button,
  Circle,
  HStack,
  ScrollView,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import HistoryAdviseItem from './component/HistoryAdviseItem';
import HeaderLayout from '@components/layout/Header';
import {navigate} from 'App';
import {clearResult} from '@hooks/response';

import IncomingAdvise from './component/IncomingAdvise';
import HistoryAdvise from './component/HistoryAdvise';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {IBottomParamList, IRootStackParamList} from '@routes/navigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
export type Tab_HomeProps = CompositeScreenProps<
  BottomTabScreenProps<IBottomParamList, 'Home'>,
  NativeStackScreenProps<IRootStackParamList>
>;
const Tab_Home: React.FC<Tab_HomeProps> = props => {
  const {mutate: clearRes} = clearResult();

  return (
    <HeaderLayout title="Trang chủ">
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack flex={1} space={4} w={'100%'} minHeight={'100%'} pt={4} pb={4}>
          <IncomingAdvise />
          <HistoryAdvise route={props.route} navigation={props.navigation} />
          <Button onPress={() => navigate('SetTimeAppointment')}>Click</Button>
          <Button
            onPress={() => {
              clearRes();
            }}>
            Click
          </Button>
        </VStack>
      </ScrollView>
    </HeaderLayout>
  );
};

const styles = StyleSheet.create({
  nextEvent__Button: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
});

export default Tab_Home;
