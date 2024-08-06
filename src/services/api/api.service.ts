import axios, {AxiosError} from 'axios';
import {store} from 'redux_/store';

const cancelTokenSource = axios.CancelToken.source();

const apiService = axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    Accept: 'application/json',
    'Content-Type': 'application/json',
    client: 'user',
  },
});

// Add a request interceptor
apiService.interceptors.request.use(
  async config => {
    const token = store.getState().auth.token;
    const isConnected = store.getState().network.isConnected;
    if (!isConnected) {
      config.cancelToken = cancelTokenSource.token;
    }
    config.timeout = 20000;
    if (token) {
      config.headers.Authorization = `Bearer ${token.accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    // Other error handling
    return Promise.reject(error);
  },
);

// Add a response interceptor
apiService.interceptors.response.use(
  response => {
    // Any status code that lies within the range of 2xx causes this function to trigger
    // Do something with response data
    return response;
  },
  error => {
    // Any status codes that fall outside the range of 2xx cause this function to trigger
    // Do something with response error
    // Request was canceled, handle accordingly
    return Promise.reject(error);
  },
);

export default apiService;
