import React from 'react';
import CusImageBackground from '@components/layout/CusImageBackground';
import {Button, Text, VStack} from 'native-base';

const ChatWithBot_Start = () => {
  return (
    <CusImageBackground
      nonBackGround={true}
      bottomButton={
        <VStack>
          <Text textAlign={'center'} variant={'body_medium_regular'}>
            Sau đây Vietmind sẽ bắt đầu kết nối với chatbot
          </Text>
          <Button variant={'cusPrimary'}>Bắt đầu</Button>
          <Button variant={'cusOutline'}>Bỏ qua</Button>
        </VStack>
      }></CusImageBackground>
  );
};

export default ChatWithBot_Start;
