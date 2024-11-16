import {Platform, StyleSheet} from 'react-native';
import React from 'react';
import HeaderBack from '@components/layout/HeaderBack';
import {Box, Text, Button, Circle, HStack, VStack, Center} from 'native-base';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IBottomParamList, IRootStackParamList} from '@routes/navigator';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

type SetTimeAppointmentSuccessProps = CompositeScreenProps<
  NativeStackScreenProps<IRootStackParamList, 'SetTimeAppointmentSuccess'>,
  BottomTabScreenProps<IBottomParamList, 'Home'>
>;
const SetTimeAppointmentSuccess: React.FC<
  SetTimeAppointmentSuccessProps
> = props => {
  const {navigation, route} = props;
  const infAppointment = route.params.infAppointment;
  return (
    <HeaderBack
      title={'Đặt lịch với nhà tham vấn'}
      withBackGround
      bottomChildren={
        <VStack space={2} pt={3} mb={Platform.OS === 'ios' ? 5 : 0}>
          <Button
            variant={'cusPrimary'}
            onPress={() => navigation.navigate('BottomTab', {screen: 'Home'})}>
            Ok
          </Button>
        </VStack>
      }>
      <Center pb={4}>
        <Circle h={120} w={120} backgroundColor={'primary.medium'} mb={4} />
        <Text variant={'header_2'} textAlign={'center'} mb={2}>
          {infAppointment.degree}
        </Text>
        <Text variant={'header_2'} textAlign={'center'} mb={4}>
          {`${infAppointment.firstName} ${infAppointment.lastName}`}
        </Text>
        <Text textAlign={'center'}>{`${infAppointment.workplace}`}</Text>
      </Center>
    </HeaderBack>
  );
};

export default SetTimeAppointmentSuccess;

const styles = StyleSheet.create({});
