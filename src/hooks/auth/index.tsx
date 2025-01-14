import {useMutation} from '@tanstack/react-query'
import {mutationPost} from '@config/api'
import {tLoginParam} from '@hooks/auth/auth.interface'
import {IResponse} from '@interface/api.interface'
import {apiPath} from '@config/api/apiPath'

export const useLogin = () => {
  return useMutation({
    mutationFn: (loginPram: tLoginParam) =>
      mutationPost<IResponse<string>>({
        url: `${apiPath.auth.LOGIN}`,
        body: loginPram,
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
