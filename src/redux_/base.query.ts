import Config from 'react-native-config';

import {BaseQueryFn} from '@reduxjs/toolkit/query/react';
import {AxiosProgressEvent, AxiosRequestConfig} from 'axios';
import apiService from 'services/api/api.service';

// import {HttpStatus} from 'constants';

export const axiosBaseQuery = (
  {baseUrl}: {baseUrl?: string} = {baseUrl: Config.API_URL},
): BaseQueryFn<{
  url: string;
  method?: AxiosRequestConfig['method'];
  body?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
  headers?: AxiosRequestConfig['headers'];
  onUploadProgress?: ((progressEvent: AxiosProgressEvent) => void) | undefined;
}> => {
  return async ({
    url,
    method = 'GET',
    body,
    params,
    headers,
    onUploadProgress,
  }) => {
    try {
      const result = await apiService({
        baseURL: baseUrl,
        url: url,
        method,
        data: body,
        params,
        headers,
        onUploadProgress,
      });
      return {data: result.data};
    } catch (axiosError: any) {
      const err = axiosError?.response;
      // if (
      //   err?.status === HttpStatus.Unauthorized ||
      //   err?.data?.message?.includes('user is not found')
      // ) {
      //   // handle expired token
      //   store.dispatch(signOut());
      //   hideLoading();
      // }
      // if (err?.status === HttpStatus.Forbidden) {
      //   // handle expired token
      //   replace(RouteName.JoinPremiumScreen);
      //   hideLoading();
      // }

      return {
        error: {
          status: err?.status,
          data: err?.data,
        },
      };
    }
  };
};
