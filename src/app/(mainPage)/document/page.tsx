'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import SearchIcon from '@mui/icons-material/Search';
import * as yup from 'yup';
import { useState } from 'react';
import { IDocumentColumn, ISearchDocumentForm } from '@/types/document';
import { useFetchAllDocumentQuery } from '@/api/documents';
import DocumentTable from '@/components/document/DocumentTable';

const columns: IDocumentColumn[] = [
  { id: 'id', label: 'STT' },
  { id: 'name', label: 'Tên tài liệu', align: 'center' },
  { id: 'btnDownload', label: 'Tải xuống', align: 'center' }
];

export default function Document() {
  const [keyword, setKeyword] = useState('');

  const [page, setPage] = useState<number>(0);
  const { data, isLoading, isFetching } = useFetchAllDocumentQuery({ name: keyword });

  const searchSchema = yup.object().shape({
    name: yup.string()
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<ISearchDocumentForm>({
    mode: 'onChange',
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(searchSchema)
  });

  const onSubmit = async (values: ISearchDocumentForm) => {
    if (values.name) {
      setKeyword(values.name);
    }
  };

  return (
    <Container maxWidth="xl">
      <Stack direction="column" spacing={2} pt={2}>
        <Stack component="form" direction="row" spacing={2} onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <TextField
              {...register('name')}
              id="name"
              type="text"
              placeholder="Nhập tên tài liệu"
              variant="outlined"
              error={!!errors.name?.message}
              helperText={errors.name?.message}
              size="small"
              sx={{
                width: '260px'
              }}
            />
          </Stack>
          <Button
            disabled={!isValid}
            type="submit"
            variant="outlined"
            sx={{
              color: '#fff',
              borderColor: '#303F9F',
              fontSize: '15px',
              borderRadius: '8px 8px 8px 0',
              fontWeight: 500,
              backgroundColor: '#303F9F',
              height: '40px',
              width: 'auto',
              '&:hover': {
                backgroundColor: '#303F9F',
                opacity: '0.9'
              },
              '&.Mui-disabled': {
                backgroundColor: '#303F9F',
                opacity: '0.6',
                color: '#fff'
              }
            }}
          >
            <SearchIcon />
            Tìm kiếm
          </Button>
        </Stack>
        <Stack>
          <DocumentTable
            columns={columns}
            data={data}
            page={page}
            setPage={setPage}
            isLoading={isLoading}
            isFetching={isFetching}
          />
        </Stack>
      </Stack>
    </Container>
  );
}
