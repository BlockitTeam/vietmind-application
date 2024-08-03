import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Circle, HStack, ScrollView, Text, VStack} from 'native-base';
import HeaderBack from '@components/layout/HeaderBack';
import HistoryAdviseItem from './component/historyAdviseItem';
import HeaderLayout from '@components/layout/Header';
// type Tab_HomeProps = BottomTabScreenProps<IBottomParamList, 'Home'>;
const Tab_Home = () => {
  console.log('home');
  return (
    <HeaderLayout title="Trang chủ">
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack flex={1} space={4} w={'100%'} minHeight={'100%'} pt={4} pb={4}>
          {/* Start: Next event */}
          <VStack space={2}>
            <Text variant={'body_large_bold'}>Lịch hẹn sắp tới</Text>
            <VStack
              bgColor={'primary.medium'}
              borderRadius={'8px'}
              p={'13px 16px'}
              space={4}>
              <HStack space={2}>
                <Circle w={'56px'} h={'56px'} bg={'white'} />
                <VStack justifyContent={'space-evenly'}>
                  <Text variant={'body_medium_bold'}>Bs. Trần Duy Nhã</Text>
                  <Text
                    variant={'body_medium_regular'}
                    color={'text.neutral_secondary'}>
                    05/12/2023 09:00 - 10:00
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
          </VStack>
          {/* End: Next event */}

          {/* Start: History advise */}
          <VStack space={2} mt={2}>
            <HStack mb={2}>
              <Text variant={'body_large_bold'}>Lịch sử tư vấn</Text>
              {/* <RNDateTimePicker value={new Date()} /> */}
            </HStack>
            {listHistoryAdviseItemFake.map(item => {
              return <HistoryAdviseItem {...item} key={item.idConversation} />;
            })}
          </VStack>
          {/* End: History advise */}
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
  {
    drName: 'Bs. Phạm Văn Lực',
    drId: '3',
    time: '22/10/2023  13:00 - 14:00',
    idConversation: '3',
  },
  {
    drName: 'Tư vấn với trợ lý ảo',
    drId: '4',
    time: '23/09/2023  15:00 - 15:33',
    idConversation: '4',
  },
  {
    drName: 'Tư vấn với trợ lý ảo',
    drId: '4',
    time: '23/09/2023  15:00 - 15:33',
    idConversation: '5',
  },
  {
    drName: 'Tư vấn với trợ lý ảo',
    drId: '4',
    time: '23/09/2023  15:00 - 15:33',
    idConversation: '6',
  },
];
