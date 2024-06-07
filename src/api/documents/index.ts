import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/api/libs/axiosBaseQuery';
import { IDocument, IDocumentAddForm, IDocumentUpdate } from '@/types/document';

export const documentsApi = createApi({
  reducerPath: 'documentsApi',
  baseQuery: axiosBaseQuery({
    baseUrl: `${process.env.BASE_URL}/documents` || ''
  }),

  endpoints: (builder) => ({
    addDocument: builder.mutation<IDocument, IDocumentAddForm>({
      query: (data) => ({
        url: '/upload',
        method: 'POST',
        data,
        headers: { 'Content-Type': 'multipart/form-data' }
      })
    }),
    fetchAllDocument: builder.query<IDocument[], { name?: string | null }>({
      query: ({ name }) => ({
        url: '',
        method: 'GET',
        params: {
          name
        }
      })
    }),
    updateDocument: builder.mutation<unknown, IDocumentUpdate>({
      query: (document) => {
        const formData = new FormData();
        if (document.file) {
          formData.append('file', document.file);
        }
        formData.append('name', document.name);

        return {
          url: `/${document.id}`,
          method: 'PATCH',
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' }
        };
      }
    })
  })
});

export const { useFetchAllDocumentQuery, useUpdateDocumentMutation, useAddDocumentMutation } =
  documentsApi;
