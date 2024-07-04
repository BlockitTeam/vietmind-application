import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  Center,
  Circle,
  HStack,
  Skeleton,
  Text,
  VStack,
} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderBack from '@components/layout/HeaderBack';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {IBottomParamList, IRootStackParamList} from '@routes/navigator';
import {useGetListDoctor} from '@hooks/user';
import {colors} from '@assets/colors';
import {axiosInstance} from '@axios/axiosInstance';
import {tDoctorResponse} from '@hooks/user/user.interface';
import AdviseLoading from './AdviseLoading';

type Tab_AdviseProps = CompositeScreenProps<
  BottomTabScreenProps<IBottomParamList, 'Advise'>,
  NativeStackScreenProps<IRootStackParamList>
>;

const Tab_Advise: React.FC<Tab_AdviseProps> = props => {
  const {navigation} = props;
  const {data: dataListDoctor, isLoading: isListDoctorLoading} =
    useGetListDoctor();

  return (
    <HeaderBack title="Tư vấn">
      <Box h={4} />
      <VStack space={2}>
        {isListDoctorLoading ? (
          <AdviseLoading />
        ) : (
          <>
            <Text variant={'body_large_bold'}>Danh sách bác sĩ</Text>
            {dataListDoctor?.data.map(item => {
              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.touchableOpacity__advise}
                  onPress={() => {
                    //Add dr information
                    navigation.navigate('ChatWithProfessional_Start', {
                      drInformation: item,
                    });
                  }}>
                  <HStack alignItems={'center'}>
                    <HStack flex={1} space={2} alignItems={'center'}>
                      <Circle
                        h={'40px'}
                        w={'40px'}
                        backgroundColor={'primary.medium'}
                      />
                      <VStack>
                        <Text
                          variant={
                            'body_medium_bold'
                          }>{`BS. ${item.firstName} ${item.lastName}`}</Text>
                        <Text
                          variant={'body_medium_regular'}
                          color={'text.neutral_secondary'}>
                          Bệnh viện bạch mai
                        </Text>
                      </VStack>
                    </HStack>
                    <Center
                      borderColor={'primary.medium'}
                      borderWidth={1}
                      bgColor={'white'}
                      h={'32px'}
                      px={'16px'}
                      py={'0px'}
                      borderRadius={'8px'}>
                      <Text variant={'body_small_bold'}>Tư vấn ngay</Text>
                    </Center>
                  </HStack>
                </TouchableOpacity>
              );
            })}
            <Box h={4} />
            <Text variant={'body_large_bold'}>Tư vấn với chatbot</Text>
            <TouchableOpacity>
              <HStack alignItems={'center'}>
                <HStack flex={1} space={2} alignItems={'center'}>
                  <Circle h={10} w={10} backgroundColor={'primary.medium'} />
                  <VStack>
                    <Text>Tư vấn với AI Bot</Text>
                    <Text>24/7</Text>
                  </VStack>
                </HStack>
                <Box>Tư vấn ngay</Box>
              </HStack>
            </TouchableOpacity>
          </>
        )}
      </VStack>
    </HeaderBack>
  );
};

export default Tab_Advise;

const styles = StyleSheet.create({
  touchableOpacity__advise: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.primary.light_medium,
    backgroundColor: colors.primary.light,
    paddingVertical: 13,
    paddingHorizontal: 12,
  },
});
