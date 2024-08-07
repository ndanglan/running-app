import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from 'redux_/base.query';

// TYPE
export type CreateUserPayload = {
  client_id?: string;
  fullname: string;
  email: string;
};

export type StartStopActivityPayload = {
  client_id: string;
};

export type UpdateActivityPayload = {
  activity_id: number | string;
  lat: number | string;
  lon: number | string;
};

export type StartActivityResponse = {
  client_id: string;
  start_time: string;
  end_time: string | null;
  status: string;
  id: number;
};

export type UpdateActivityResponse = {
  id: number;
  activity_id: number | string;
  location: any;
  timestamp: any;
};

export type StopActivityResponse = StartActivityResponse;
export type CreateUserResponse = {
  client_id: string;
  fullname: string;
  email: string;
  status: string;
  id: number;
  created_date: string;
};
// initialize an empty api service that we'll inject endpoints into later as needed
export const authenticatedApi = createApi({
  baseQuery: axiosBaseQuery(),
  reducerPath: 'authenticatedApi',
  endpoints: build => ({
    createUser: build.mutation<CreateUserResponse, CreateUserPayload>({
      query: payload => ({
        url: '/user',
        method: 'POST',
        body: {
          ...payload,
          status: 'active',
        },
      }),
    }),
    startActivity: build.mutation<
      StartActivityResponse,
      StartStopActivityPayload
    >({
      query: payload => ({
        url: '/atv/start',
        method: 'POST',
        body: payload,
      }),
    }),
    stopActivity: build.mutation<
      StopActivityResponse,
      StartStopActivityPayload
    >({
      query: payload => ({
        url: '/atv/stop',
        method: 'POST',
        body: payload,
      }),
    }),
    updateActivity: build.mutation<
      UpdateActivityResponse,
      UpdateActivityPayload
    >({
      query: payload => ({
        url: '/atvdt',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useStartActivityMutation,
  useStopActivityMutation,
  useUpdateActivityMutation,
} = authenticatedApi;
