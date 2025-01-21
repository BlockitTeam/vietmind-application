import {
  Box,
  Button,
  Center,
  Divider,
  HStack,
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
import {Google, Facebook} from '@assets/icons'
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
import {messageAuthAtom} from '@services/jotaiStorage/messageAuthAtom'

import {useCurrentUser} from '@hooks/user'
import {TOAST_PLACEMENT} from 'src/constants'
import LoginForm from './LoginForm/LoginForm'
import JSEncrypt from 'jsencrypt'

Settings.setAppID('1677651809436240')
Settings.initializeSDK()

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive'],
  profileImageSize: 120,
  forceCodeForRefreshToken: true,
  iosClientId: process.env.IOS_CLIENT_ID,
  webClientId: process.env.WEB_CLIENT_ID,
})

export type tTypeOfLogin =
  | 'google'
  | 'facebook'
  | 'username'
  | 'success'
  | undefined

const Login = () => {
  const [, setCurUser] = useAtom(curUserAtom)
  const [_, setMessageAuth] = useAtom(messageAuthAtom)
  const toast = useToast()
  const [isLogin, setIsLogin] = useState<tTypeOfLogin>(undefined)
  const showToast = (title: string, id: string) => {
    if (!toast.isActive('failed_login'))
      toast.show({
        title,
        duration: 3000,
        placement: TOAST_PLACEMENT,
        id: id,
      })
  }
  const useLoginMutation = useLogin()
  const {isLoading, refetch} = useCurrentUser()
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
          showToast('Đăng nhập thất bại, vui lòng thử lại!', 'failed_login')
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
              showToast('Đăng nhập thất bại, vui lòng thử lại!', 'failed_login')
            },
            onSettled: () => {
              setIsLogin(undefined)
            },
          },
        )
      }
    } catch (error: any) {
      setIsLogin(undefined)
      showToast('Đăng nhập thất bại, vui lòng thử lại!', 'failed_login')

      console.log(error)
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
        showToast('Đăng nhập thất bại, vui lòng thử lại!', 'failed_login')
      }
    }
  }
  console.log(isLogin && isLogin !== 'facebook', 'fb')
  console.log(isLogin && isLogin !== 'google', 'google')
  return (
    <ImageBackground source={BackGround} style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <Center flex={1} px={4}>
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

            <HStack alignItems={'center'} space={2} w="100%">
              <Divider bg={'gray.300'} flex={1} />
              <Text color={'gray.300'}>Hoặc</Text>
              <Divider bg={'gray.300'} flex={1} />
            </HStack>

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
          </VStack>
        </Center>
      </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  loginButton: {width: '100%', maxWidth: 485},
  buttonDisable: {
    backgroundColor: 'gray.100',
    opacity: 0.5,
  },
})
export default Login
