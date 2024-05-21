import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { ILoginResponse, IUser, IUserLoginForm, IUserRegisterForm } from '@/types/auth';
import { axiosBaseQuery } from '@/api/libs/axiosBaseQuery';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.BASE_URL || ''
  }),

  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, IUserLoginForm>({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        data
      })
    }),
    register: builder.mutation<IUserRegisterForm, IUserRegisterForm>({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        data: data
      })
    }),
    fetchProfile: builder.query<IUser, undefined>({
      query: () => ({
        url: '/auth/profile',
        method: 'GET'
      })
    }),
    logout: builder.mutation<any, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST'
      })
    })
  })
});

export const { useLoginMutation, useFetchProfileQuery, useLogoutMutation, useRegisterMutation } =
  authApi;
export const { login } = authApi.endpoints;
