import React, {useState} from 'react';
import HeaderBack from '@components/layout/HeaderBack';
import {Box, Button, HStack, ScrollView, Text, VStack} from 'native-base';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {colors} from '@assets/colors';
import ButtonDate from './ButtonDate';
import {Platform} from 'react-native';
import {useGetAvailableByDate} from '@hooks/availabilities/getAvailableByDate';
import ButtonDateLoading from './ButtonDate/ButtonDateLoading';
import {clearSecond} from 'src/utils/formatDate';
import {tAppointment} from '@hooks/appointment/appointment.interface';
import {tAvailableByDate} from '@hooks/availabilities';
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
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [selectedTimeAppointment, setSelectedTimeAppointment] = useState<
    tAvailableByDate | undefined
  >(undefined);

  const {data: availableDate, isLoading: isAvailableLoading} =
    useGetAvailableByDate(selectedDate);
  const handleDayPress = (day: any) => {
    console.log(day);
    setSelectedDate(day.dateString);
    setSelectedTimeAppointment(undefined);
  };

  return (
    <HeaderBack
      title={'Đặt lịch với nhà tham vấn'}
      withBackGround
      bottomChildren={
        <VStack space={2} pt={3} mb={Platform.OS === 'ios' ? 5 : 0}>
          <Button variant={'cusPrimary'} disabled={!selectedTimeAppointment}>
            Đặt lịch với chuyên gia
          </Button>
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
          {isAvailableLoading ? (
            <>
              <ButtonDateLoading mb={2} />
              <ButtonDateLoading mb={2} />
              <ButtonDateLoading mb={2} />
              <ButtonDateLoading mb={2} />
              <ButtonDateLoading mb={2} />
            </>
          ) : (
            <>
              {availableDate?.data.map(date => (
                <ButtonDate
                  isSelected={
                    !selectedTimeAppointment
                      ? false
                      : selectedTimeAppointment.id === date.id
                  }
                  onPress={() => {
                    setSelectedTimeAppointment(date);
                  }}
                  mb={2}
                  date={`${clearSecond(date.startTime)} - ${clearSecond(
                    date.endTime,
                  )}`}
                />
              ))}
            </>
          )}
        </HStack>
      </ScrollView>
    </HeaderBack>
  );
};

export default SetTimeAppointment;
