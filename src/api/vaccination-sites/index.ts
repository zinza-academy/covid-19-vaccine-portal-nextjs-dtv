import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/api/libs/axiosBaseQuery';
import {
  ICreateInjectionPoint,
  IInjectionPoint,
  IInjectionPointUpdate
} from '@/types/injection-point';
import { LIMIT_PAGE_VACCINATION_SITE } from '@/utils/constants';

export const vaccinationSitesApi = createApi({
  reducerPath: 'vaccinationSitesApi',
  baseQuery: axiosBaseQuery({
    baseUrl: `${process.env.BASE_URL}/vaccination-sites` || ''
  }),

  endpoints: (builder) => ({
    createVaccinationSite: builder.mutation<IInjectionPoint, ICreateInjectionPoint>({
      query: (data) => ({
        url: '/create',
        method: 'POST',
        data: data
      })
    }),
    fetchAllVaccinationSites: builder.query<
      { data: IInjectionPoint[]; total: number; limit: number; page: number },
      { page?: number; limit?: number; ward?: string | null; name?: string | null }
    >({
      query: ({ page = 1, limit = LIMIT_PAGE_VACCINATION_SITE, ward, name }) => ({
        url: '/list',
        method: 'GET',
        params: {
          page,
          limit,
          ward,
          name
        }
      })
    }),
    updateVaccinationSites: builder.mutation<unknown, IInjectionPointUpdate>({
      query: (data) => ({
        url: `/edit/${data.id}`,
        method: 'PUT',
        data: {
          name: data.name,
          manager: data.manager,
          number_table: data.number_table
        }
      })
    })
  })
});

export const {
  useFetchAllVaccinationSitesQuery,
  useUpdateVaccinationSitesMutation,
  useCreateVaccinationSiteMutation
} = vaccinationSitesApi;
