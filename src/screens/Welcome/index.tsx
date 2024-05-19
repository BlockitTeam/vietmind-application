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

import {storeFirstLoad} from '@services/asyncStorage/firstLoadApp';
import {useAtom} from 'jotai';
import {firstLoadAtom} from '@services/jotaiStorage/firstLoadAtom';
const WelcomeScreen = () => {
  const [_, setFirstInit] = useAtom(firstLoadAtom);
  console.log(_);
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
          <Text color={'text.neutral_primary'} fontFamily={'heading'} fontSize={36}>
            Vietmind
          </Text>
          <Text color={'text.default'} textAlign={'center'}>
            Chào mừng bạn đến với Vietmind - nơi kết nối dễ dàng với các chuyên
            gia tâm lý
          </Text>
        </Center>
        <Button
          mb={'36px'}
          width={'90%'}
          maxW={'485px'}
          variant={'cusPrimary'}
          onPress={async () =>
            await storeFirstLoad('0').then(value => {
              if (value === '1') {
                setFirstInit(true);
              } else {
                setFirstInit(false);
              }
            })
          }>
          Bắt đầu
        </Button>
      </Flex>
    </ImageBackground>
  );
};

export default WelcomeScreen;
