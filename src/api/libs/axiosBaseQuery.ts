import axiosInstance from '@/api/libs/axiosInstance';
import { BaseQueryFn, retry } from '@reduxjs/toolkit/query';
import { AxiosRequestConfig } from 'axios';

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params
      });

      return { data: result.data };
    } catch (axiosError: any) {
      console.error('Axios Errorxx:', axiosError);
      return {
        error: {
          status: axiosError.response?.status || null,
          data: axiosError.response?.data || null
        }
      };
    }
  };

export const staggeredAxiosBaseQuery = ({ baseUrl = '' }: { baseUrl: string }) =>
  retry(axiosBaseQuery({ baseUrl }), {
    maxRetries: 1
  });
