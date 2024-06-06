'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import SearchIcon from '@mui/icons-material/Search';
import * as yup from 'yup';
import { useState } from 'react';
import DocumentTable from '@/components/admin/document/DocumentTable';
import EditModal from '@/components/admin/document/EditModal';
import { IDocumentColumn, IDocumentUpdate, ISearchDocumentForm } from '@/types/document';
import { useFetchAllDocumentQuery } from '@/api/documents';
import AddModal from '@/components/admin/document/AddModal';

const columns: IDocumentColumn[] = [
  { id: 'id', label: 'STT' },
  { id: 'name', label: 'Tên tài liệu', align: 'center' },
  { id: 'btnEdit', label: 'Sửa', align: 'center' },
  { id: 'btnDownload', label: 'Tải xuống', align: 'center' }
];

export default function Document() {
  const [open, setOpen] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [editData, setEditData] = useState<IDocumentUpdate>({
    id: -1,
    name: ''
  });
  const [page, setPage] = useState<number>(0);
  const { data, isLoading, isFetching, refetch } = useFetchAllDocumentQuery({ name: keyword });

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
      <EditModal open={open} setOpen={setOpen} editData={editData} refetchData={refetch} />
      <AddModal open={openAddModal} setOpen={setOpenAddModal} refetchData={refetch} />

      <Stack direction="column" spacing={2} pt={2}>
        <Stack direction="row" justifyContent="space-between">
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
              disabled={!isValid || isLoading}
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
            <Button onClick={() => setOpenAddModal(true)}>Thêm tài liệu</Button>
          </Stack>
        </Stack>
        <Stack>
          <DocumentTable
            columns={columns}
            data={data}
            onEdit={setOpen}
            setEditData={setEditData}
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
