import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Image,
  Text,
  VStack,
} from 'native-base';
import React from 'react';
import {ImageBackground} from 'react-native';
import BackGround from '@assets/images/Background.png';
import Focused from '@assets/images/focused.png';
import {SafeAreaView} from 'react-native-safe-area-context';
const WelcomeScreen = () => {
  return (
    <ImageBackground source={BackGround}>
      <Flex h={'full'} alignItems={'center'} justifyContent={'center'}>
        <Center width={278} flex={1}>
          <Image
            source={Focused}
            width={278}
            height={183.84}
            mb={20}
            alt="Focused image"
          />
          <Text color={'text.neutral_primary'} fontSize={36}>
            Vietmind
          </Text>
          <Text color={'text.default'} textAlign={'center'}>
            Chào mừng bạn đến với Vietmind - nơi kết nối dễ dàng với các chuyên
            gia tâm lý
          </Text>
        </Center>
        <Button mb={'36px'} width={'90%'} maxW={'485px'} variant={'primary'}>
          Bắt đầu
        </Button>
      </Flex>
    </ImageBackground>
  );
};

export default WelcomeScreen;
