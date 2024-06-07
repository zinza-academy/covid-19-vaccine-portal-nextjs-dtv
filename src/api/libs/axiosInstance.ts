import { ACCESS_TOKEN } from '@/utils/constants';
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getCookie } from 'cookies-next';

const axiosInstance = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    const access_token = getCookie(ACCESS_TOKEN);

    if (config.headers && access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },

  function (error: AxiosError | Error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },

  function (error: AxiosError | Error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosInstance;
