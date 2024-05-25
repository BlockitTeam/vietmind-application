import {Box, Button, Center, Text, VStack} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {ImageBackground} from 'react-native';
import BackGround from '@images/Background.png';
import {Google, Facebook} from '@assets/icons';
import {useAtom} from 'jotai';
import {curUserAtom} from '@services/jotaiStorage/curUserAtom';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useCurrentUser, useLogin} from '@axios';

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive'],
  offlineAccess: true,
  forceCodeForRefreshToken: true,
  profileImageSize: 120,
  iosClientId:
    '670374882757-cructl1jmhrqbhc2sv1vorvpn6qf2dg5.apps.googleusercontent.com',
  webClientId:
    '670374882757-822dvb2pd6i16v4qjdsfcdkibf9m698g.apps.googleusercontent.com',
});
// 670374882757-822dvb2pd6i16v4qjdsfcdkibf9m698g.apps.googleusercontent.com
// Somewhere in your code

const Login = () => {
  const [curUser, setCurUser] = useAtom(curUserAtom);

  const loginFunc = () => {
    setCurUser({avatar: '1241', tokenId: '12412', username: 'Duy Nhã Trần'});
  };

  const signIn = async () => {
    console.log('signIn');
    try {
      console.log('-trycatch');

      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      if (userInfo.idToken) {
        const verifyToken = await useLogin(userInfo.idToken);
        console.log(verifyToken.data.message);
      }
      {
        //toast login unexpected error
      }

      // setState({userInfo});
      console.log(userInfo);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
      console.log(error + '1');
    }
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
          onPress={signIn}>
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
