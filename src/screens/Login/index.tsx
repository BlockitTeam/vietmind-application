import {Box, Button, Center, Flex, HStack, Text, VStack} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {ImageBackground} from 'react-native';
import BackGround from '@assets/images/Background.png';
import {Facebook, Google} from '@assets/icons';
const Login = () => {
  return (
    <ImageBackground source={BackGround}>
      <VStack
        h={'full'}
        alignItems={'center'}
        justifyContent={'center'}
        space={2}>
        <Text
          color={'text.neutral_primary'}
          fontFamily={'heading'}
          fontSize={36}
          mb={2}>
          Đăng ký
        </Text>
        <Button style={styles.loginButton} variant={'cusOutline'}>
          <Center flexDir={'row'}>
            <Google />
            <Box ml={1}>
              <Text>Đăng ký bằng Google</Text>
            </Box>
          </Center>
        </Button>
        <Button style={styles.loginButton} variant={'cusOutline'}>
          <Center flexDir={'row'}>
            <Facebook />
            <Box ml={1}>
              <Text>Đăng ký bằng Facebook</Text>
            </Box>
          </Center>
        </Button>
      </VStack>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  loginButton: {backgroundColor: 'white', width: '90%', maxWidth: 485},
});
export default Login;
