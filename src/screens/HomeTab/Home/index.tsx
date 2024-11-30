import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {
  Button,
  Circle,
  HStack,
  ScrollView,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import HeaderBack from '@components/layout/HeaderBack';
import HistoryAdviseItem from './component/historyAdviseItem';
import HeaderLayout from '@components/layout/Header';
import {navigate} from 'App';
import {clearResult} from '@hooks/response';
import {useGetAppointment} from '@hooks/appointment/getAppointment';
import {useGetDoctorById} from '@hooks/user';
import {clearSecond} from 'src/utils/formatDate';
// type Tab_HomeProps = BottomTabScreenProps<IBottomParamList, 'Home'>;
const Tab_Home = () => {
  const {mutate: clearRes} = clearResult();
  const {data: appointmentData, isLoading: isAppointmentLoading} =
    useGetAppointment();
  const {data, isLoading, refetch} = useGetDoctorById(
    appointmentData?.data.doctorId,
  );

  useEffect(() => {
    if (typeof appointmentData !== 'string') {
      refetch();
    }
  }, [appointmentData]);
  return (
    <HeaderLayout title="Trang chủ">
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack flex={1} space={4} w={'100%'} minHeight={'100%'} pt={4} pb={4}>
          {/* Start: Next event */}
          <VStack space={2}>
            <Text variant={'body_large_bold'}>Lịch hẹn sắp tới</Text>
            {isAppointmentLoading || isLoading ? (
              <Spinner />
            ) : data?.data && appointmentData?.data ? (
              <VStack
                bgColor={'primary.medium'}
                borderRadius={'8px'}
                p={'13px 16px'}
                space={4}>
                <HStack space={2}>
                  <Circle w={'56px'} h={'56px'} bg={'white'} />
                  <VStack justifyContent={'space-evenly'}>
                    <Text variant={'body_medium_bold'}>
                      Bs. {`${data.data.lastName} ${data.data.firstName}`}
                    </Text>
                    <Text
                      variant={'body_medium_regular'}
                      color={'text.neutral_secondary'}>
                      {`${appointmentData?.data.appointmentDate} ${clearSecond(
                        appointmentData?.data.startTime,
                      )} - ${clearSecond(appointmentData?.data.endTime)}`}
                    </Text>
                  </VStack>
                </HStack>
                <HStack space={2}>
                  <TouchableOpacity style={styles.nextEvent__Button}>
                    <Text variant={'body_small_bold'} textAlign={'center'}>
                      Dời lịch hẹn
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.nextEvent__Button}>
                    <Text variant={'body_small_bold'} textAlign={'center'}>
                      Hủy lịch hẹn
                    </Text>
                  </TouchableOpacity>
                </HStack>
              </VStack>
            ) : (
              <Text>Bạn không có cuộc hẹn nào!</Text>
            )}
          </VStack>
          {/* End: Next event */}

          {/* Start: History advise */}
          <VStack space={2} mt={2}>
            <HStack mb={2}>
              <Text variant={'body_large_bold'}>Lịch sử tư vấn</Text>
            </HStack>
            {listHistoryAdviseItemFake.map(item => {
              return <HistoryAdviseItem {...item} key={item.idConversation} />;
            })}
          </VStack>
          {/* End: History advise */}
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

export const listHistoryAdviseItemFake = [
  {
    drName: 'Bs. Trần Duy Nhã',
    drId: '1',
    time: '05/12/2023  09:00 - 10:30',
    idConversation: '1',
  },
  {
    drName: 'Bs. Trần Duy Nhã',
    drId: '1',
    time: '05/12/2023  11:00 - 12:30',
    idConversation: '8',
  },
  {
    drName: 'Bs. Rin chan 98',
    drId: '2',
    time: '08/11/2023  07:00 - 9:00',
    idConversation: '2',
  },

];
