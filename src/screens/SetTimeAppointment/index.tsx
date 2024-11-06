import React, {useState} from 'react';
import HeaderBack from '@components/layout/HeaderBack';
import {
  Box,
  Button,
  HStack,
  ScrollView,
  SimpleGrid,
  Text,
  VStack,
} from 'native-base';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {colors} from '@assets/colors';
import ButtonDate from './ButtonDate';
import {Platform} from 'react-native';
// Set Vietnamese locale
LocaleConfig.locales['vi'] = {
  monthNames: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  monthNamesShort: [
    'T1',
    'T2',
    'T3',
    'T4',
    'T5',
    'T6',
    'T7',
    'T8',
    'T9',
    'T10',
    'T11',
    'T12',
  ],
  dayNames: [
    'Chủ nhật',
    'Thứ hai',
    'Thứ ba',
    'Thứ tư',
    'Thứ năm',
    'Thứ sáu',
    'Thứ bảy',
  ],
  dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  today: 'Hôm nay',
};
LocaleConfig.defaultLocale = 'vi';

const SetTimeAppointment = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDayPress = (day: any) => {
    console.log(day);
    setSelectedDate(day.dateString);
  };

  return (
    <HeaderBack
      title={'Đặt lịch với nhà tham vấn'}
      withBackGround
      bottomChildren={
        <VStack space={2} pt={3} mb={Platform.OS === 'ios' ? 5 : 0}>
          <Button variant={'cusPrimary'}>Đặt lịch với chuyên gia</Button>
          <Button variant={'cusOutline'}>Bỏ qua</Button>
        </VStack>
      }>
      <Text variant={'sf_header_2'} textAlign={'center'} mt={8}>
        Chọn ngày giờ
      </Text>

      <Box bg="transparent" borderRadius="lg" my={2}>
        <Calendar
          style={{height: 265}}
          locale="vi" // Vietnamese locale
          minDate={new Date().toISOString().split('T')[0]} // Disable past months
          onDayPress={handleDayPress}
          markedDates={{
            [new Date().toISOString().split('T')[0]]: {
              marked: true,
              dotColor: 'red', // Optional: Mark today with a dot
              textColor: 'black', // Ensure today's text is black
            },
            [selectedDate]: {
              selected: true,
              selectedColor: colors.primary.medium, // Selected day background color
              textColor: 'black', // Ensure today's text is black
              marked:
                new Date().toISOString().split('T')[0] === selectedDate
                  ? true
                  : false,
              dotColor: 'red',
              customStyles: {
                container: {
                  borderRadius: 8, // Square shape with rounded corners
                },
              },
            },
          }}
          theme={{
            calendarBackground: 'transparent', // Transparent background
            selectedDayTextColor: 'black', // Ensure the selected day text is black
            todayTextColor: 'black', // Ensure today’s text is black
            arrowColor: 'black',
            dayTextColor: 'black', // Default day text color
            textDisabledColor: 'gray', // Disabled day text color
            // stylesheet.day.basic: {
            //   selected: {
            //     borderRadius: 8, // Square shape with rounded corners
            //   },
            //   selectedText: {
            //     fontWeight: 'bold', // Bold text for selected day
            //   },
            // },
          }}
        />
      </Box>
      <Box mb={2} mt={12}>
        <Text textAlign={'left'}>Ca làm việc:</Text>
      </Box>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HStack flexWrap={'wrap'} space={2} alignItems={'center'}>
          <ButtonDate mb={2} date="11:00 - 12:00" />
          <ButtonDate mb={2} date="11:00 - 12:00" />
          <ButtonDate mb={2} date="11:00 - 12:00" />
          <ButtonDate mb={2} date="11:00 - 12:00" />
          <ButtonDate mb={2} date="11:00 - 12:00" />
          <ButtonDate mb={2} date="11:00 - 12:00" />
          <ButtonDate mb={2} date="11:00 - 12:00" />
          <ButtonDate mb={2} date="11:00 - 12:00" />
          <ButtonDate mb={2} date="11:00 - 12:00" />
          <ButtonDate mb={2} date="11:00 - 12:00" />
          <ButtonDate mb={2} date="11:00 - 12:00" />
          <ButtonDate mb={2} date="11:00 - 12:00" />
          <ButtonDate mb={2} date="11:00 - 12:00" />
          <ButtonDate mb={2} date="11:00 - 12:00" />
        </HStack>
      </ScrollView>
    </HeaderBack>
  );
};

export default SetTimeAppointment;
