import {useGetAppointment} from '@hooks/appointment/getAppointment';
import {useGetDoctorById} from '@hooks/user';
import {
  Spinner,
  VStack,
  Text,
  HStack,
  Box,
  Circle,
  Skeleton,
} from 'native-base';
import React from 'react';
import {clearSecond} from 'src/utils/formatDate';

const IncomingAdvise = () => {
  const {data: appointmentData, isLoading: isAppointmentLoading} =
    useGetAppointment();
  const {data, isLoading} = useGetDoctorById(appointmentData?.data.doctorId);
  // console.log(appointmentData);
  return (
    <VStack space={2}>
      <Text variant={'body_large_bold'}>Lịch hẹn sắp tới</Text>
      {isAppointmentLoading || isLoading ? (
        <Skeleton w="100%" h="82px" />
      ) : data?.data && appointmentData?.data ? (
        <VStack
          position={'relative'}
          bgColor={'primary.medium'}
          borderRadius={'8px'}
          p={'13px 16px'}
          space={4}>
          <HStack space={2}>
            {appointmentData?.data.status === 'IN_PROGRESS' && (
              <Box
                position={'absolute'}
                top={-10}
                right={-10}
                p={2}
                borderTopRightRadius={8}
                bgColor={'white'}>
                <Text variant={'caption_regular'} fontWeight={'semibold'}>
                  Đang diễn ra
                </Text>
              </Box>
            )}
            {appointmentData?.data.status === 'FINISH' && (
              <Box
                position={'absolute'}
                top={-10}
                right={-10}
                p={2}
                borderTopRightRadius={8}
                bgColor={'white'}>
                <Text variant={'caption_regular'} fontWeight={'semibold'}>
                  Đã kết thúc
                </Text>
              </Box>
            )}
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
        </VStack>
      ) : (
        <Text>Bạn không có cuộc hẹn nào!</Text>
      )}
    </VStack>
  );
};

export default IncomingAdvise;
