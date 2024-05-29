import {Box, Button, Center, Text, View, VStack} from 'native-base';
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

import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk-next';

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

  const loginFacebook = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      if (result.isCancelled) {
        console.log('Login cancelled');
        return;
      }

      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        console.log('Something went wrong obtaining access token');
        return;
      }

      const {accessToken} = data;

      const responseInfoCallback = (error: any, result: any) => {
        if (error) {
          console.log(error);
          console.log('Error fetching data: ' + error.toString());
        } else {
          console.log(result);
          console.log('Success fetching data: ' + result.toString());
        }
      };

      const infoRequest = new GraphRequest(
        '/me',
        {
          accessToken: accessToken,
          parameters: {
            fields: {
              string: 'email,name,first_name,middle_name,last_name',
            },
          },
        },
        responseInfoCallback,
      );

      // Start the graph request.
      new GraphRequestManager().addRequest(infoRequest).start();

      return data;
    } catch (error) {
      console.error('Login failed with error: ' + error);
    }
  };

  const loginFunc = async () => {
    // const result = await loginFacebook();
    // setCurUser({avatar: '1241', tokenId: '12412', username: 'Duy Nhã Trần'});
  };

  const signInGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo.idToken) {
        // setState({userInfo});
        const verifyToken = await useLogin(userInfo.idToken);
      }
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
          onPress={signInGoogle}>
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
          onPress={loginFacebook}>
          <Center flexDir={'row'}>
            <Facebook />
            <Box ml={1}>
              <Text>Đăng ký bằng Facebook</Text>
            </Box>
          </Center>
        </Button>
        {/* <View>
          <LoginButton
            onLoginFinished={(error: any, result: any) => {
              if (error) {
                console.log('login has error: ' + result.error);
              } else if (result.isCancelled) {
                console.log('login is cancelled.');
              } else {
                AccessToken.getCurrentAccessToken().then((data: any) => {
                  console.log(data.accessToken.toString());
                });
              }
            }}
            onLogoutFinished={() => console.log('logout.')}
          />
        </View> */}
      </VStack>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  loginButton: {width: '90%', maxWidth: 485},
});
export default Login;
