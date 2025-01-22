import {useMutation} from '@tanstack/react-query'
import {mutationPost} from '@config/api'
import {tLoginParam} from '@hooks/auth/auth.interface'
import {IResponse} from '@interface/api.interface'
import {apiPath} from '@config/api/apiPath'
import {tLoginForm} from '@screens/Auth/Login/LoginForm/LoginForm'

export const useLogin = () => {
  return useMutation({
    mutationFn: (loginParam: tLoginParam) =>
      mutationPost<IResponse<string>>({
        url: `${apiPath.auth.LOGIN}`,
        body: loginParam,
      }),
  })
}

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: () =>
      mutationPost<IResponse<string>>({
        url: `${apiPath.auth.LOGOUT}`,
        body: {},
      }),
  })
}

export const useLoginWithUserNamePassword = () => {
  return useMutation({
    mutationFn: (loginParam: tLoginForm) => {
      console.log('post', apiPath.auth.LOGIN, loginParam)
      return mutationPost<IResponse<string>>({
        url: `${apiPath.auth.LOGIN_PASS}`,
        body: loginParam,
      })
    },
  })
}