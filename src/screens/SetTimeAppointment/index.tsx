import React, {useState} from 'react';
import HeaderBack from '@components/layout/HeaderBack';
import {Box, HStack, Text} from 'native-base';
import {Calendar} from 'react-native-calendars';
import {colors} from '@assets/colors';

const SetTimeAppointment = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDayPress = day => {
    setSelectedDate(day.dateString);
  };
  return (
    <HeaderBack title={'Đặt lịch với nhà tham vấn'} withBackGround>
      <Text variant={'sf_header_2'} textAlign={'center'} mt={8}>
        Chọn ngày giờ
      </Text>
      <Box bg="transparent" p={4} borderRadius="lg" my={6}>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={{
            [selectedDate]: {
              selected: true,
              marked: true,
              selectedColor: 'blue',
            },
          }}
          theme={{
            calendarBackground: 'transparent', // Make calendar background transparent
            selectedDayBackgroundColor: colors.primary.medium50,
            todayTextColor: colors.primary.medium,
            arrowColor: colors.primary.medium,
          }}
        />
      </Box>
      <HStack space={2}>
        <Box
          bg="white"
          w={'110px'}
          textAlign={'center'}
          p={1}
          borderColor="primary.medium"
          borderWidth={1}
          borderRadius={8}>
          <Text textAlign={'center'}>11:00 - 12:00</Text>
        </Box>
        <Box
          bg="white"
          w={'110px'}
          textAlign={'center'}
          p={1}
          borderColor="primary.medium"
          borderWidth={1}
          borderRadius={8}>
          <Text textAlign={'center'}>13:00 - 16:00</Text>
        </Box>
      </HStack>
      <Box
        mt={4}
        bg="white"
        w={'110px'}
        textAlign={'center'}
        p={1}
        borderColor="primary.medium"
        borderWidth={1}
        borderRadius={8}>
        <Text textAlign={'center'}>16:00 - 17:00</Text>
      </Box>
    </HeaderBack>
  );
};

export default SetTimeAppointment;
