import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import {
  IForgotPasswordForm,
  ILoginResponse,
  IResetPasswordForm,
  IUser,
  IUserLoginForm,
  IUserRegisterForm
} from '@/types/auth';
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
    fetchProfile: builder.query<IUser, void>({
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
    }),
    forgotPassword: builder.mutation<any, IForgotPasswordForm>({
      query: (data) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        data
      })
    }),
    resetPassword: builder.mutation<any, IResetPasswordForm & { token: string }>({
      query: (data) => ({
        url: '/auth/reset-password',
        method: 'POST',
        data
      })
    })
  })
});

export const {
  useLoginMutation,
  useFetchProfileQuery,
  useLogoutMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation
} = authApi;
export const { login } = authApi.endpoints;
