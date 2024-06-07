import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/api/libs/axiosBaseQuery';
import { ICreateVaccinationResult, IVaccinationResult } from '@/types/vaccination_result';

export const vaccinationResultsApi = createApi({
  reducerPath: 'vaccinationResultsApi',
  baseQuery: axiosBaseQuery({
    baseUrl: `${process.env.BASE_URL}/vaccination-results` || ''
  }),

  endpoints: (builder) => ({
    createVaccinationResult: builder.mutation<any, ICreateVaccinationResult>({
      query: (data) => ({
        url: '/create',
        method: 'POST',
        data
      })
    }),
    fetchForUser: builder.query<IVaccinationResult[], void>({
      query: () => ({
        url: '/',
        method: 'GET'
      })
    })
  })
});

export const { useCreateVaccinationResultMutation, useFetchForUserQuery } = vaccinationResultsApi;
