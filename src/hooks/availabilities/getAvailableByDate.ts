// http://91.108.104.57:9001/api/v1/availabilities/available-by-date?date=2024-10-29
// getAppointmentByConversationId

import {getData} from '@config/api';
import {apiPath} from '@config/api/apiPath';
import {IResponse} from '@interface/api.interface';
import {useQuery} from '@tanstack/react-query';
import {tAvailableByDate} from '.';
import queryString from 'query-string';

type TGetAvailableByDateResponse = IResponse<tAvailableByDate[]>;

export const useGetAvailableByDate = (date: string) => {
  const url = queryString.stringifyUrl(
    {
      url: apiPath.availabilities.GET_AVAILABLE_BY_DATE,
      query: {
        date: date,
      },
    },
    {arrayFormat: 'comma'},
  );
  //   const url = apiPath.availabilities.GET_AVAILABLE_BY_DATE;
  return useQuery<TGetAvailableByDateResponse>({
    queryKey: ['useGetAvailableByDate', date],
    queryFn: () => getData<TGetAvailableByDateResponse>(url),
    gcTime: 2000,
  });
};
