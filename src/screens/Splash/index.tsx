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
import {storeFirstLoad} from '@services/asyncStorage/firstLoadApp';
const Splash = () => {
  return (
    <ImageBackground source={BackGround}>
      <Flex h={'full'} alignItems={'center'} justifyContent={'center'}>
        <Text color={'text.neutral_primary'} fontSize={36}>
          Vietmind
        </Text>
      </Flex>
    </ImageBackground>
  );
};

export default Splash;
