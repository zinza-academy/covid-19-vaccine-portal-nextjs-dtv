import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { ILoginResponse, IUser, IUserLoginForm } from '@/types/auth';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'base_url'
  }),
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, IUserLoginForm>({
      query: ({ email, password }) => ({
        url: '/login',
        method: 'POST',
        body: {
          email,
          password
        }
      })
    }),
    fetchProfile: builder.query<IUser, { token: string }>({
      query: ({ token }) => ({
        url: '/profile',
        method: 'GET'
      })
    })
  })
});

export const { useLoginMutation, useFetchProfileQuery } = authApi;
export const { login } = authApi.endpoints;
