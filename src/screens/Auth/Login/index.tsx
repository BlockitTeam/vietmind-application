import {
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Image,
  ScrollView,
  Spinner,
  Text,
  useToast,
  VStack,
} from 'native-base'
import React, {useEffect, useState} from 'react'
import {Platform, StyleSheet} from 'react-native'
import {ImageBackground} from 'react-native'
import BackGround from '@images/Background.png'
import {Google, Facebook, Apple} from '@assets/icons'
import {useAtom} from 'jotai'
import {curUserAtom} from '@services/jotaiStorage/curUserAtom'
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin'
import {
  AccessToken,
  AuthenticationToken,
  LoginManager,
  Settings,
} from 'react-native-fbsdk-next'
import {useLogin} from '@hooks/auth'

import {useCurrentUser} from '@hooks/user'
import {TOAST_PLACEMENT} from 'src/constants'
import LoginForm from './LoginForm/LoginForm'
import {TOAST_KEY} from 'src/constants/toast.key'

import appleAuth from '@invertase/react-native-apple-authentication'
import {authorize} from 'react-native-app-auth'
import Logo from '@images/Logo.png'

const appleAuthConfig = {
  issuer: 'https://appleid.apple.com',
  clientId: 'vietmind',
  redirectUrl: 'vietmind_mobile://callback', // Cần cấu hình trên Apple Developer
  scopes: ['email', 'name'],
  responseType: 'code',
  responseMode: 'form_post',
}
Settings.setAppID('1677651809436240')
Settings.initializeSDK()

GoogleSignin.configure({
  scopes: ['email', 'profile'], // Remove the Drive scope and only request basic permissions
  profileImageSize: 120, // Optional: Adjust the profile image size as needed
  forceCodeForRefreshToken: false, // Set this to false if you don't need a refresh token
  iosClientId: process.env.IOS_CLIENT_ID, // Use your iOS Client ID from Google Cloud
  webClientId: process.env.WEB_CLIENT_ID, // Use your Web Client ID from Google Cloud
})

export type tTypeOfLogin =
  | 'google'
  | 'facebook'
  | 'apple'
  | 'username'
  | 'success'
  | undefined

const Login = () => {
  const [, setCurUser] = useAtom(curUserAtom)
  const {refetch} = useCurrentUser()
  const toast = useToast()
  const [isLogin, setIsLogin] = useState<tTypeOfLogin>(undefined)
  const showToast = (title: string, id: string) => {
    if (!toast.isActive(TOAST_KEY.LOGIN_FAIL))
      toast.show({
        title,
        duration: 3000,
        placement: TOAST_PLACEMENT,
        id: id,
      })
  }
  const [isAppleSignInAvailable, setIsAppleSignInAvailable] = useState(false)

  useEffect(() => {
    if (Platform.OS === 'ios' && parseInt(Platform.Version, 10) >= 13) {
      setIsAppleSignInAvailable(true)
    }
    async function checkPlayServices() {
      if (Platform.OS === 'android') {
        try {
          await GoogleSignin.hasPlayServices({
            showPlayServicesUpdateDialog: true,
          })
        } catch (error) {}
      }
    }
    checkPlayServices()
  }, [])
  const useLoginMutation = useLogin()
  const loginFacebook = async () => {
    try {
      setIsLogin('facebook')
      let token: string | undefined
      const result = await LoginManager.logInWithPermissions(
        ['public_profile', 'email'],
        'limited',
        'my_nonce', // Optional
      )
      if (result.isCancelled) {
        // Handle the case when the user cancels the login
        showToast(
          'Bạn chưa hoàn tất đăng nhập với Facebook!',
          TOAST_KEY.LOGIN_FAIL,
        )

        setIsLogin(undefined)
        return
      }
      if (Platform.OS === 'ios') {
        // This token **cannot** be used to access the Graph API.
        // https://developers.facebook.com/docs/facebook-login/limited-login/
        const result = await AuthenticationToken.getAuthenticationTokenIOS()
        token = result?.authenticationToken
      } else {
        // This token can be used to access the Graph API.
        const result = await AccessToken.getCurrentAccessToken()
        token = result?.accessToken
      }
      if (token) {
        try {
          useLoginMutation.mutate(
            {
              token: token,
              provider: 'facebook',
            },
            {
              onSuccess: () => {
                refetch().then((res) => {
                  if (res.data?.statusCode === 200 && res.data.data) {
                    setCurUser({...res.data.data})
                    setIsLogin('success')
                  }
                })
              },
              onError: () => {
                showToast(
                  'Đăng nhập thất bại, vui lòng thử lại!',
                  'failed_login',
                )
              },
              onSettled: () => {
                setIsLogin(undefined)
              },
            },
          )
        } catch (error) {
          setIsLogin(undefined)
          showToast(
            'Đăng nhập thất bại, vui lòng thử lại!',
            TOAST_KEY.LOGIN_FAIL,
          )
        }
      }
    } catch (error) {
      setIsLogin(undefined)
      console.log(error)
    }
  }

  const signInGoogle = async () => {
    try {
      setIsLogin('google')
      await GoogleSignin.signOut()
      await GoogleSignin.hasPlayServices()
      // Sign in to get a new token
      const userInfo = await GoogleSignin.signIn()

      if (userInfo.idToken) {
        await GoogleSignin.clearCachedAccessToken(userInfo.idToken)
        useLoginMutation.mutate(
          {
            token: userInfo.idToken,
            provider: 'google',
          },
          {
            onSuccess: () => {
              refetch().then((res) => {
                if (res.data?.statusCode === 200 && res.data.data) {
                  setCurUser({...res.data.data})
                  setIsLogin('success')
                }
              })
            },
            onError: () => {
              showToast(
                'Đăng nhập thất bại, vui lòng thử lại!',
                TOAST_KEY.LOGIN_FAIL,
              )
            },
            onSettled: () => {
              setIsLogin(undefined)
            },
          },
        )
      }
    } catch (error: any) {
      setIsLogin(undefined)
      // showToast('Đăng nhập thất bại, vui lòng thử lại!', TOAST_KEY.LOGIN_FAIL)

      console.log(error.toString(), 'here')
      if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        showToast(
          'Không thể kiểm tra Google Play Services.',
          TOAST_KEY.LOGIN_FAIL,
        )
      }
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        showToast(
          'Bạn chưa hoàn tất đăng nhập với Google!',
          TOAST_KEY.LOGIN_FAIL,
        )
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
        // showToast('Đăng nhập thất bại, vui lòng thử lại!', TOAST_KEY.LOGIN_FAIL)
      }
    }
  }

  const signIn = async () => {
    try {
      setIsLogin('apple')

      let identityToken, authorizationCode
      if (isAppleSignInAvailable) {
        try {
          const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
          })
          identityToken = appleAuthRequestResponse.identityToken
          authorizationCode = appleAuthRequestResponse.authorizationCode
        } catch (error) {
          setIsLogin(undefined)
        }
      } else {
        const authState = await authorize(appleAuthConfig)
        authorizationCode = authState.authorizationCode
      }
      if (identityToken) {
        // if (authorizationCode) {
        useLoginMutation.mutate(
          {
            token: identityToken,
            provider: 'apple',
          },
          {
            onSuccess: () => {
              refetch().then((res) => {
                if (res.data?.statusCode === 200 && res.data.data) {
                  setCurUser({...res.data.data})
                  setIsLogin('success')
                }
              })
            },
            onError: (e) => {
              console.log(JSON.stringify(e))
              setIsLogin(undefined)

              showToast('Đăng nhập thất bại, vui lòng thử lại!', 'failed_login')
            },
            onSettled: () => {},
          },
        )

        // Gửi authorizationCode hoặc identityToken lên backend để xác thực
        // const response = await fetch('https://yourbackend.com/api/apple-login', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ authorizationCode, identityToken }),
        // });
        // const result = await response.json()
        // if (result.success) {
        //   Alert.alert('Login Success', `User ID: ${result.user.sub}, Email: ${result.user.email}`);
        // } else {
        //   Alert.alert('Login Failed', result.message);
        // }
      } else {
        // Alert.alert('Login Failed', 'No authorization code or identity token');
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <ImageBackground source={BackGround} style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <Center flex={1} px={4}>
          <Image source={Logo} w={32} h={32} alt="Feeling good image" />
          <VStack
            alignItems="center"
            justifyContent="center"
            space={4}
            w="100%"
            maxW={485}
            py={6}
            borderRadius="md">
            <Text variant={'header_1'} mb={2}>
              Đăng nhập
            </Text>
            <LoginForm isLogin={isLogin} setIsLogin={(b) => setIsLogin(b)} />

            <HStack alignItems={'center'} space={4} w="100%">
              <Divider bg={'gray.300'} flex={1} />
              <Text color={'gray.300'}>Hoặc</Text>
              <Divider bg={'gray.300'} flex={1} />
            </HStack>

            <VStack space={2} w="100%">
              <Button
                style={[
                  styles.loginButton,
                  isLogin && isLogin !== 'google' && styles.buttonDisable,
                ]}
                variant={'cusOutline'}
                disabled={
                  isLogin === 'success' || (isLogin && isLogin !== 'google')
                }
                onPress={() => {
                  isLogin === undefined && signInGoogle()
                }}>
                <Center flexDir={'row'}>
                  {isLogin === 'google' ? (
                    <Spinner h={'24px'} w={'25px'} />
                  ) : (
                    <Google />
                  )}

                  <Box ml={1}>
                    <Text variant={'body_medium_bold'}>
                      Đăng nhập bằng Google
                    </Text>
                  </Box>
                </Center>
              </Button>
              <Button
                style={[
                  styles.loginButton,
                  isLogin && isLogin !== 'facebook' && styles.buttonDisable,
                ]}
                variant={'cusOutline'}
                disabled={
                  isLogin === 'success' || (isLogin && isLogin !== 'facebook')
                }
                onPress={() => {
                  isLogin === undefined && loginFacebook()
                }}>
                <Center flexDir={'row'}>
                  {isLogin === 'facebook' ? (
                    <Spinner h={'24px'} w={'25px'} />
                  ) : (
                    <Facebook />
                  )}
                  <Box ml={1}>
                    <Text variant={'body_medium_bold'}>
                      Đăng nhập bằng Facebook
                    </Text>
                  </Box>
                </Center>
              </Button>
              <Button
                style={[
                  styles.loginButton,
                  isLogin && isLogin !== 'apple' && styles.buttonDisable,
                  (Platform.OS !== 'ios' ||
                    parseInt(Platform.Version as string, 10) < 13) &&
                    styles.buttonDisable,
                ]}
                variant={'cusOutline'}
                disabled={
                  Platform.OS === 'ios' &&
                  parseInt(Platform.Version as string, 10) >= 13
                    ? isLogin === 'success' || (isLogin && isLogin !== 'apple')
                    : true
                }
                onPress={() => {
                  isLogin === undefined && signIn()
                }}>
                <Center flexDir={'row'}>
                  {isLogin === 'apple' ? (
                    <Spinner h={'24px'} w={'24px'} />
                  ) : (
                    <Apple fill={'#000'} />
                  )}
                  <Box ml={1}>
                    <Text variant={'body_medium_bold'}>
                      Đăng nhập bằng Apple
                    </Text>
                  </Box>
                </Center>
              </Button>
            </VStack>
          </VStack>
        </Center>
      </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  loginButton: {
    width: '100%',
    maxWidth: 485,
  },
  buttonDisable: {
    backgroundColor: 'gray.100',
    opacity: 0.5,
  },
})
export default Login
