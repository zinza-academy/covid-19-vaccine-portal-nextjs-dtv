import { IDistrict, IProvince, IWard } from '@/types/address';
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

export const addressApi = createApi({
  reducerPath: 'addressApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.BASE_URL
  }),
  endpoints: (builder) => ({
    fetchProvince: builder.query<IProvince[], void>({
      query: () => ({
        url: '/provinces',
        method: 'GET'
      })
    }),
    fetchDistrict: builder.query<IDistrict[], { province_id: string | number }>({
      query: ({ province_id }) => ({
        url: `/provinces/districts/${province_id}`,
        method: 'GET'
      })
    }),
    fetchWard: builder.query<IWard[], { district_id: string | number }>({
      query: ({ district_id }) => ({
        url: `provinces/wards/${district_id}`,
        method: 'GET'
      })
    })
  })
});

export const { useFetchProvinceQuery, useFetchDistrictQuery, useFetchWardQuery } = addressApi;
