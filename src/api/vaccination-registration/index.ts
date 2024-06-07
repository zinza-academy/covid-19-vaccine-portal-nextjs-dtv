import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/api/libs/axiosBaseQuery';
import {
  IVaccinationRegistrationResult,
  IVaccineRegistrationFormData
} from '@/types/vaccination-registration';
import { LIMIT_PAGE_VACCINATION_SITE } from '@/utils/constants';

interface IVaccinationRegistrationData {
  priority_id: number;
  hic?: string;
  job?: string;
  workplace?: string;
  address?: string;
  appointment_date: string;
  user_id: number;
}
export const vaccinationRegistrationApi = createApi({
  reducerPath: 'vaccinationRegistrationApi',
  baseQuery: axiosBaseQuery({
    baseUrl: `${process.env.BASE_URL}/vaccination-registrations` || ''
  }),

  endpoints: (builder) => ({
    create: builder.mutation<any, IVaccinationRegistrationData>({
      query: (data) => ({
        url: '/',
        method: 'POST',
        data
      })
    }),
    update: builder.mutation<any, IVaccineRegistrationFormData>({
      query: (data) => ({
        url: '/:id',
        method: 'PUT',
        data
      })
    }),
    fetchAll: builder.query<
      { data: IVaccinationRegistrationResult[]; total: number; limit: number; page: number },
      { page?: number; limit?: number; hic?: string | null }
    >({
      query: ({ page = 1, limit = LIMIT_PAGE_VACCINATION_SITE, hic }) => ({
        url: '/',
        method: 'GET',
        params: {
          page,
          limit,
          hic
        }
      })
    })
  })
});

export const { useCreateMutation, useUpdateMutation, useFetchAllQuery } =
  vaccinationRegistrationApi;
