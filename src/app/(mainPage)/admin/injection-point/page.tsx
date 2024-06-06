'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import SearchIcon from '@mui/icons-material/Search';
import * as yup from 'yup';
import InjectionPointTable from '@/components/admin/injection-point/InjectionPointTable';
import { useState } from 'react';
import EditModal from '@/components/admin/injection-point/EditModal';
import {
  IInjectionPointColumn,
  IInjectionPointUpdate,
  ISearchInjectionPointForm
} from '@/types/injection-point';
import { useFetchAllVaccinationSitesQuery } from '@/api/vaccination-sites';
import AddModal from '@/components/admin/injection-point/addModal';

const columns: IInjectionPointColumn[] = [
  { id: 'id', label: 'STT' },
  { id: 'name', label: 'Tên điểm tiêm', align: 'center', minWidth: 170 },
  { id: 'house_number', label: 'Số nhà', align: 'center' },
  { id: 'street', label: 'Tên đường/phố', align: 'center' },
  { id: 'ward', label: 'Xã/Phường', align: 'center' },
  { id: 'manager', label: 'Người quản lý', align: 'center' },
  { id: 'number_table', label: 'Số bàn tiêm', align: 'center' }
];

export default function InjectionPoint() {
  const [open, setOpen] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);

  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState('');

  const { data, isLoading, isFetching, refetch } = useFetchAllVaccinationSitesQuery({
    page: page + 1,
    name: keyword
  });

  const searchSchema = yup.object().shape({
    injectionPoint: yup.string().required('Require')
  });
  const [editData, setEditData] = useState<IInjectionPointUpdate>({
    id: 0,
    name: '',
    manager: '',
    number_table: 0
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<ISearchInjectionPointForm>({
    mode: 'onChange',
    defaultValues: {
      injectionPoint: ''
    },
    resolver: yupResolver(searchSchema)
  });

  const onSubmit = async (values: ISearchInjectionPointForm) => {
    setKeyword(values.injectionPoint);
  };

  return (
    <Container maxWidth="xl">
      <EditModal open={open} setOpen={setOpen} editData={editData} refetchData={refetch} />
      <AddModal open={openAddModal} setOpen={setOpenAddModal} refetchData={refetch}></AddModal>
      <Stack direction="column" spacing={2} pt={2}>
        <Stack direction="row" justifyContent="space-between">
          <Stack component="form" direction="row" spacing={2} onSubmit={handleSubmit(onSubmit)}>
            <Stack>
              <TextField
                {...register('injectionPoint')}
                id="ijnectionPoint"
                type="text"
                placeholder="Điểm tiêm"
                variant="outlined"
                error={!!errors.injectionPoint?.message}
                helperText={errors.injectionPoint?.message}
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
            <Button onClick={() => setOpenAddModal(true)}>Thêm điểm tiêm</Button>
          </Stack>
        </Stack>
        <Stack>
          <InjectionPointTable
            columns={columns}
            onEdit={setOpen}
            setEditData={setEditData}
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
