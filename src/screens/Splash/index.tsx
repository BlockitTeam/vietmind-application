import {
  Flex,
  Text,
} from 'native-base';
import React from 'react';
import {ImageBackground} from 'react-native';
import BackGround from '@assets/images/Background.png';
const Splash = () => {
  return (
    <ImageBackground source={BackGround}>
      <Flex
        h={'full'}
        alignItems={'center'}
        fontFamily={'heading'}
        justifyContent={'center'}>
        <Text color={'text.neutral_primary'} fontSize={36}>
          Vietmind
        </Text>
      </Flex>
    </ImageBackground>
  );
};

export default Splash;
