import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {getData, mutationPost, mutationPut} from '@config/api'
import {tLoginParam} from '@hooks/auth/auth.interface'
import {IResponse} from '@interface/api.interface'
import {apiPath} from '@config/api/apiPath'
import queryString from 'query-string'

// 'http://localhost:9001',

export const useLogin = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (loginPram: tLoginParam) =>
      mutationPost<IResponse<string>>({
        url: `${apiPath.auth.LOGIN}`,
        body: loginPram,
      }),
  })
}

export const useLogoutMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () =>
      mutationPost<IResponse<string>>({
        url: `${apiPath.auth.LOGOUT}`,
        body: {},
      }),
  })
}
