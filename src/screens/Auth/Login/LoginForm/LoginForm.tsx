import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {
  Box,
  Button,
  FormControl,
  Input,
  Spinner,
  useToast,
  VStack,
} from 'native-base'
import {Eye, EyeSlash, Lock, User} from '@assets/icons'
import {normalizeFontSize} from 'src/utils/fontSize'
import {tTypeOfLogin} from '..'
import {useLoginWithUserNamePassword} from '@hooks/auth'
import {TOAST_PLACEMENT} from 'src/constants'

export type tLoginForm = {
  username: string
  password: string
}

type tFormLoginProps = {
  isLogin: tTypeOfLogin
  setIsLogin: (value: tTypeOfLogin) => void
}
const LoginForm: React.FC<tFormLoginProps> = (props) => {
  const {isLogin, setIsLogin} = props
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm<tLoginForm>({
    mode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
    },
  })
  const toast = useToast()

  const {mutate: loginMutation} = useLoginWithUserNamePassword()
  const showToast = (title: string, id: string) => {
    if (!toast.isActive(id))
      toast.show({
        title,
        duration: 3000,
        placement: TOAST_PLACEMENT,
      })
  }
  const onSubmit = (data: tLoginForm) => {
    setIsLogin('username')
    loginMutation(data, {
      onSuccess: (v) => {
        console.log(vvvv)
      },
      onError: (error) => {
        showToast('Đăng nhập thất bại, vui lòng thử lại!', 'failed_login')
      },
      onSettled: () => {
        setIsLogin(undefined)
      },
    })
  }
  const [showPassword, setShowPassword] = useState<boolean>(false)
  return (
    <VStack space={2} w={'100%'}>
      <FormControl isRequired isInvalid={'username' in errors}>
        <Controller
          control={control}
          rules={{required: 'Vui lòng nhập tên đăng nhập!'}}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              py={2}
              _ios={{py: 3}}
              autoCapitalize="none"
              fontSize={normalizeFontSize(14)}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Tên đăng nhập"
              InputLeftElement={
                <Box style={{marginLeft: 10}}>
                  <User height={20} width={20} fill={'#aaa'} />
                </Box>
              }
            />
          )}
          name="username"
        />
        {'username' in errors && errors.username && (
          <FormControl.ErrorMessage>
            {errors.username.message}
          </FormControl.ErrorMessage>
        )}
      </FormControl>
      <FormControl isRequired isInvalid={'password' in errors}>
        <Controller
          control={control}
          rules={{required: 'Vui lòng nhập mật khẩu'}}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              py={2}
              _ios={{py: 3}}
              autoCapitalize="none"
              fontSize={normalizeFontSize(14)}
              type={showPassword ? 'text' : 'password'}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Nhập mật khẩu"
              InputLeftElement={
                <Box style={{marginLeft: 10}}>
                  <Lock height={20} width={20} fill={'#aaa'} />
                </Box>
              }
              InputRightElement={
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={{marginRight: 8}}>
                  {showPassword ? (
                    <EyeSlash height={20} width={20} fill={'#aaa'} />
                  ) : (
                    <Eye height={20} width={20} fill={'#aaa'} />
                  )}
                </TouchableOpacity>
              }
            />
          )}
          name="password"
        />
        {'password' in errors && errors.password && (
          <FormControl.ErrorMessage>
            {errors.password.message}
          </FormControl.ErrorMessage>
        )}
      </FormControl>

      <Button
        mt={1}
        style={isLogin && isLogin !== 'username' && styles.btnDisabled}
        onPress={handleSubmit(onSubmit)}
        variant={'cusPrimary'}
        isLoading={isLogin === 'username'}
        _spinner={{height: '21px'}} // Customize the spinner size
        isDisabled={isLogin === 'success' || !isValid}>
        Đăng nhập
      </Button>
    </VStack>
  )
}

export default LoginForm

const styles = StyleSheet.create({
  btnDisabled: {
    backgroundColor: 'gray.100',
    opacity: 0.5,
  },
})
