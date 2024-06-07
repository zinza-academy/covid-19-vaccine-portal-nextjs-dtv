import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/api/libs/axiosBaseQuery';
import { IUpdateUserForm } from '@/types/user';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: axiosBaseQuery({
    baseUrl: `${process.env.BASE_URL}/users` || ''
  }),

  endpoints: (builder) => ({
    updateProfile: builder.mutation<any, IUpdateUserForm & { id: number }>({
      query: ({ id, ...data }) => ({
        url: `/${id}`,
        method: 'PUT',
        data
      })
    })
  })
});

export const { useUpdateProfileMutation } = usersApi;
