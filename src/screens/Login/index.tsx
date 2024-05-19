import {Button, Center, Flex, Text, View} from 'native-base';
import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {ImageBackground} from 'react-native';
import BackGround from '@assets/images/Background.png';
import {Google} from '@icons/Google';
const Login = () => {
  return (
    <ImageBackground source={BackGround}>
      <Center h={'full'}>
        <Text color={'text.neutral_primary'} fontSize={36}>
          Đăng ký
        </Text>
        <Button>
          <Google /> Đăng ký bằng Google
        </Button>
        <Button>Đăng ký bằng Facebook</Button>
      </Center>
    </ImageBackground>
  );
};

export default Login;
