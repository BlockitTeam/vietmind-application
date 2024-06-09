import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {getData, mutationPost, mutationPut} from '@config/api';
import {
  tLoginParam,
  tPutEditUserParam,
  tUserResponse,
} from '@hooks/auth/auth.interface';
import {IResponse} from '@interface/api.interface';
import {apiPath} from '@config/api/apiPath';
import queryString from 'query-string';

// 'http://localhost:9001',

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (loginPram: tLoginParam) =>
      mutationPost<IResponse<string>>({
        url: `${apiPath.AUTH}`,
        body: loginPram,
      }),
  });
};

export const useCurrentUser = () => {
  const url = queryString.stringifyUrl(
    {
      url: apiPath.user.GET_CURRENT_USER,
    },
    {arrayFormat: 'comma'},
  );
  return useQuery<IResponse<tUserResponse>>({
    queryKey: ['useCurrentUser'],
    queryFn: () => getData<IResponse<tUserResponse>>(url),
    // gcTime: Infinity,
    enabled: false,
  });
};

export const usePutEditUser = () => {
  return useMutation({
    mutationFn: (body: tPutEditUserParam) => {
      return mutationPut<IResponse<tUserResponse>>({
        url: apiPath.user.PUT,
        body: {...body},
      });
    },
  });
};
