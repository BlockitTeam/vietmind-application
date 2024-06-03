import {Box, Button, Center, Text, View, VStack} from 'native-base';
import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {ImageBackground} from 'react-native';
import BackGround from '@images/Background.png';
import {Google, Facebook} from '@assets/icons';
import {useAtom} from 'jotai';
import {curUserAtom} from '@services/jotaiStorage/curUserAtom';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {axiosInstance} from '@axios';

import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
  AuthenticationToken,
} from 'react-native-fbsdk-next';
import {useCurrentUser, useLogin} from '@hooks/auth';

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
      const result = await LoginManager.logInWithPermissions(
        ['public_profile', 'email'],
        'enabled',
      );
      if (Platform.OS === 'ios') {
        // This token **cannot** be used to access the Graph API.
        // https://developers.facebook.com/docs/facebook-login/limited-login/
        const result = await AuthenticationToken.getAuthenticationTokenIOS();
        if (result?.authenticationToken) {
          console.log(result.authenticationToken);
          try {
            const login = await useLogin(
              result?.authenticationToken,
              'facebook',
            );
            console.log(JSON.stringify(login.data), '------');
          } catch (error: any) {
            console.log(JSON.stringify(error.data));
          }
        }
        // console.log(result?.authenticationToken);
      } else {
        // This token can be used to access the Graph API.
        const result = await AccessToken.getCurrentAccessToken();
        if (result?.accessToken) {
          console.log(result?.accessToken);

          try {
            const login = await useLogin(result?.accessToken, 'facebook');
            console.log(JSON.stringify(login), '------');
          } catch (error) {
            console.log(JSON.stringify(error));
          }
        }
      }
    } catch (error: any) {
      console.log(JSON.stringify(error));
    }
  };

  // const loginFacebook = async () => {
  //   try {
  //     const result = await LoginManager.logInWithPermissions(
  //       ['public_profile', 'email'],
  //       'limited',
  //       'my_nonce', // Optional
  //     );
  //     if (result.isCancelled) {
  //       console.log('Login cancelled');
  //       return;
  //     }

  //     // Platform IOS
  //     if (Platform.OS === 'ios') {
  //       const data = await AuthenticationToken.getAuthenticationTokenIOS();
  //       //Have token -> currently, fetch data but after we just need send it to backend
  //       if (data?.authenticationToken) {
  //         console.log(data?.authenticationToken);
  //         const responseInfoCallback = (error: any, result: any) => {
  //           if (error) {
  //             console.log('Error fetching data: ' + error.toString());
  //           } else {
  //             console.log(
  //               'Token: ' + JSON.stringify(data?.authenticationToken),
  //             );
  //             console.log('Success fetching data: ' + JSON.stringify(result));
  //           }
  //         };
  //         const infoRequest = new GraphRequest(
  //           '/me',
  //           {
  //             accessToken: data.authenticationToken,
  //             parameters: {
  //               fields: {
  //                 string: 'email,name',
  //               },
  //             },
  //           },
  //           responseInfoCallback,
  //         );
  //         new GraphRequestManager().addRequest(infoRequest).start();
  //         // setCurUser({
  //         //   avatar: '1241',
  //         //   tokenId: '12412',
  //         //   username: 'Duy Nhã Trần',
  //         // });
  //       } else {
  //         console.log('Something went wrong obtaining access token');
  //       }
  //     }
  //     // Platform Android
  //     else {
  //       //Have token -> currently, fetch data but after we just need send it to backend
  //       const data = await AccessToken.getCurrentAccessToken();
  //       if (data?.accessToken) {
  //         const responseInfoCallback = (error: any, result: any) => {
  //           if (error) {
  //             console.log('Error fetching data: ' + error.toString());
  //           } else {
  //             console.log('Token: ' + JSON.stringify(data?.accessToken));
  //             console.log('Success fetching data: ' + JSON.stringify(result));
  //           }
  //         };
  //         const infoRequest = new GraphRequest(
  //           '/me',
  //           {
  //             accessToken: data.accessToken,
  //             parameters: {
  //               fields: {
  //                 string: 'email,name',
  //               },
  //             },
  //           },
  //           responseInfoCallback,
  //         );
  //         new GraphRequestManager().addRequest(infoRequest).start();
  //         // setCurUser({
  //         //   avatar: '1241',
  //         //   tokenId: '12412',
  //         //   username: 'Duy Nhã Trần',
  //         // });
  //       } else {
  //         console.log('Something went wrong obtaining access token');
  //       }
  //     }
  //     return;
  //   } catch (error) {
  //     console.error('Login failed with error: ' + error);
  //   }
  // };

  const loginFunc = async () => {
    // const result = await loginFacebook();
  };

  const signInGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo.idToken) {
        // setState({userInfo});
        // const verifyToken = await useLogin(userInfo.idToken);
        setCurUser({
          avatar: '1241',
          tokenId: '12412',
          username: 'Duy Nhã Trần',
        });
        console.log('user Info: ', JSON.stringify(userInfo));
        // Set info after verify successfully
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
              <Text variant={'body_medium_bold'}>Đăng ký bằng Google</Text>
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
              <Text variant={'body_medium_bold'}>Đăng ký bằng Facebook</Text>
            </Box>
          </Center>
        </Button>
        <Button
          onPress={async () => {
            const a = await useCurrentUser();
            console.log(a);
          }}>
          Fetch
        </Button>
      </VStack>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  loginButton: {width: '90%', maxWidth: 485},
});
export default Login;
