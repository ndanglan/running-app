import {createApi} from '@reduxjs/toolkit/query/react';

import {axiosBaseQuery} from '../base.query';

// initialize an empty api service that we'll inject endpoints into later as needed
export const authenticatedApi = createApi({
  baseQuery: axiosBaseQuery(),
  reducerPath: 'authenticatedApi',
  endpoints: () => ({}),
  tagTypes: ['HOME'],
});
