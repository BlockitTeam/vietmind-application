import {
  Box,
  Button,
  Center,
  Spinner,
  Text,
  useSafeArea,
  useToast,
  View,
  VStack,
} from 'native-base';
import React, {useEffect, useState} from 'react';
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

import {
  AccessToken,
  LoginManager,
  AuthenticationToken,
} from 'react-native-fbsdk-next';
import {useLogin} from '@hooks/auth';
import {messageAuthAtom} from '@services/jotaiStorage/messageAuthAtom';

import {useCurrentUser} from '@hooks/user';
import {TOAST_PLACEMENT} from 'src/constants';

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive'],
  // offlineAccess: true,
  profileImageSize: 120,
  forceCodeForRefreshToken: true,
  iosClientId: process.env.IOS_CLIENT_ID,
  webClientId: process.env.WEB_CLIENT_ID,
});
// 670374882757-822dvb2pd6i16v4qjdsfcdkibf9m698g.apps.googleusercontent.com
// Somewhere in your code

const Login = () => {
  const [curUser, setCurUser] = useAtom(curUserAtom);
  const [_, setMessageAuth] = useAtom(messageAuthAtom);
  const toast = useToast();

  const showToast = (title: string) => {
    toast.show({
      title,
      duration: 3000,
      placement: TOAST_PLACEMENT,
    });
  };
  //Todo: API
  const useLoginMutation = useLogin();
  const {isLoading, refetch} = useCurrentUser();
  const [fetchUser, setFetchUser] = useState(false);
  //Todo: Func
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
          setFetchUser(true);

          try {
            // const value = await axiosInstance.post('/auth', {
            //   token: result.authenticationToken,
            //   provider: 'facebook',
            // });
            useLoginMutation.mutate(
              {
                token: result.authenticationToken,
                provider: 'facebook',
              },
              {
                onSuccess: value => {
                  refetch();
                },
                onError: error => {
                  showToast('Login fail, please try again!');
                },
                onSettled: () => {
                  setFetchUser(true);
                },
              },
            );
          } catch (error: any) {
            showToast('Login fail, please try again!');
          }
        }
      } else {
        // This token can be used to access the Graph API.
        const result = await AccessToken.getCurrentAccessToken();
        if (result?.accessToken) {
          setFetchUser(true);

          try {
            await useLoginMutation.mutate(
              {
                token: result.accessToken,
                provider: 'facebook',
              },
              {
                onSuccess: () => {
                  refetch()
                    .then(res => {
                      if (res.data?.statusCode === 200 && res.data.data) {
                        setCurUser({...res.data.data});
                      }
                    })
                    .finally(() => {});
                },
                onError: () => {
                  showToast('Login fail, please try again!');
                },
                onSettled: () => {
                  setFetchUser(false);
                },
              },
            );
          } catch (error) {
            showToast('Login fail, please try again!');
          }
        }
      }
    } catch (error: any) {
      showToast('Login fail, please try again!');
    }
  };

  const signInGoogle = async () => {
    try {
      setFetchUser(true);
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices();

      // Revoke the token to force a new one

      // Sign in to get a new token
      const userInfo = await GoogleSignin.signIn();

      if (userInfo.idToken) {
        await GoogleSignin.clearCachedAccessToken(userInfo.idToken);
        await useLoginMutation.mutate(
          {
            token: userInfo.idToken,
            provider: 'google',
          },
          {
            onSuccess: () => {
              refetch().then(res => {
                if (res.data?.statusCode === 200 && res.data.data) {
                  setCurUser({...res.data.data});
                  setFetchUser(false);
                }
              });
            },
            onError: e => {
              setMessageAuth('Login fail, please try again!');
              setFetchUser(false);
            },
          },
        );
      }
    } catch (error: any) {
      setFetchUser(false);

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
        console.log(error)
        setMessageAuth('Login fail, please try again!');
      }
    }
  };
  return (
    <ImageBackground source={BackGround}>
      {(isLoading || fetchUser) && (
        <Box
          h={'100%'}
          w={'100%'}
          background={'black'}
          opacity={'0.5'}
          zIndex={'100'}
          position={'absolute'}
        />
      )}
      <VStack
        h={'full'}
        alignItems={'center'}
        justifyContent={'center'}
        space={2}
        mx={'8px'}>
        <Text variant={'header_1'} mb={2}>
          Đăng nhập
        </Text>
        <Button
          style={styles.loginButton}
          variant={'cusOutline'}
          onPress={signInGoogle}>
          <Center flexDir={'row'}>
            <Google />
            <Box ml={1}>
              <Text variant={'body_medium_bold'}>Đăng nhập bằng Google</Text>
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
              <Text variant={'body_medium_bold'}>Đăng nhập bằng Facebook</Text>
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
