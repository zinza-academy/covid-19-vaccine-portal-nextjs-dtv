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
      headers?: AxiosRequestConfig['headers'];
    },
    unknown,
    {
      statusCode?: number;
      message?: string;
      error?: string;
    }
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers
      });

      return { data: result.data };
    } catch (axiosError: any) {
      let err = axiosError;
      if (axiosError.response) {
        err = {
          statusCode: axiosError.response.status,
          message: axiosError.response.data?.message || axiosError.message
        };
      } else if (axiosError.request) {
        err = {
          statusCode: 500,
          message: 'No response received from server'
        };
      } else {
        err = {
          statusCode: 500,
          message: axiosError.message
        };
      }
      return { error: err };
    }
  };

export const staggeredAxiosBaseQuery = ({ baseUrl = '' }: { baseUrl: string }) =>
  retry(axiosBaseQuery({ baseUrl }), {
    maxRetries: 1
  });
