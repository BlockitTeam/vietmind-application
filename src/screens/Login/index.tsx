import {Box, Button, Center, Text, VStack} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {ImageBackground} from 'react-native';
import BackGround from '@images/Background.png';
import {Google, Facebook} from '@assets/icons';
import {useAtom} from 'jotai';
import {curUserAtom} from '@services/jotaiStorage/curUserAtom';

const Login = () => {
  const [curUser, setCurUser] = useAtom(curUserAtom);

  const loginFunc = () => {
    setCurUser({avatar: '1241', tokenId: '12412', username: 'Duy Nhã Trần'});
  };
  return (
    <ImageBackground source={BackGround}>
      <VStack
        h={'full'}
        alignItems={'center'}
        justifyContent={'center'}
        space={2}
        mx={'8px'}>
        <Text variant={'header_1'} mb={2}>
          Đăng ký
        </Text>
        <Button
          style={styles.loginButton}
          variant={'cusOutline'}
          onPress={loginFunc}>
          <Center flexDir={'row'}>
            <Google />
            <Box ml={1}>
              <Text>Đăng ký bằng Google</Text>
            </Box>
          </Center>
        </Button>
        <Button
          style={styles.loginButton}
          variant={'cusOutline'}
          onPress={loginFunc}>
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
  loginButton: {width: '90%', maxWidth: 485},
});
export default Login;
