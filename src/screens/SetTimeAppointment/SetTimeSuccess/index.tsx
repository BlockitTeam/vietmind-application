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
      <HStack alignItems="center" space={'8px'}>
        <HStack flex={1} space={2} alignItems="center">
          <Circle h="40px" w="40px" backgroundColor="primary.medium" />
          <Box flex={1}>
            <Text
              variant="body_medium_bold"
              numberOfLines={
                1
              }>{`Bs. ${infAppointment.firstName} ${infAppointment.lastName}`}</Text>
            <Text
              variant="body_medium_regular"
              color="text.neutral_secondary"
              numberOfLines={1}>
              {infAppointment.degree}
            </Text>
          </Box>
        </HStack>
      </HStack>
    </HeaderBack>
  );
};

export default SetTimeAppointmentSuccess;

const styles = StyleSheet.create({});
