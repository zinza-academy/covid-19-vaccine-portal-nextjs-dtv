'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import SearchIcon from '@mui/icons-material/Search';
import * as yup from 'yup';
import { useState } from 'react';
import VaccineRegistrationTable from '@/components/admin/vaccine-registration/VaccineRegistrationTable';
import EditModal from '@/components/admin/vaccine-registration/EditModal';
import { ISearchVaccineRegistrationForm, IVaccineRegistrationColumn } from '@/types/vaccine';
import { useFetchAllQuery } from '@/api/vaccination-registration';
import { ICreateVaccinationResult } from '@/types/vaccination_result';
import dayjs from 'dayjs';
import { IVaccinationRegistrationResult } from '@/types/vaccination-registration';

const columns: IVaccineRegistrationColumn[] = [
  { id: 'id', label: 'STT' },
  { id: 'name', label: 'Họ tên', align: 'center' },
  { id: 'hic', label: 'Số thẻ bảo hiểm y tế', align: 'center', minWidth: 170 },
  { id: 'groupPriority', label: 'Nhóm ưu tiên', align: 'center' },
  { id: 'appointmentDate', label: 'Ngày tiêm', align: 'center' },
  { id: 'session', label: 'Buổi tiêm', align: 'center' },
  { id: 'status', label: 'Trạng thái', align: 'center' }
];

export default function InjectionPoint() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState('');
  const { data, isLoading, isFetching, refetch } = useFetchAllQuery({
    hic: keyword,
    page: page + 1
  });
  const searchSchema = yup.object().shape({
    hic: yup.string().nullable()
  });

  const [editData, setEditData] = useState<IVaccinationRegistrationResult | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<ISearchVaccineRegistrationForm>({
    mode: 'onChange',
    defaultValues: {
      hic: ''
    },
    resolver: yupResolver(searchSchema)
  });

  const onSubmit = async (values: ISearchVaccineRegistrationForm) => {
    if (values.hic) {
      setKeyword(values.hic);
    }
  };

  return (
    <Container maxWidth="xl">
      <EditModal open={open} setOpen={setOpen} editData={editData} refetchData={refetch} />
      <Stack direction="column" spacing={2} pt={2}>
        <Stack component="form" direction="row" spacing={2} onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <TextField
              {...register('hic')}
              id="hic"
              type="text"
              placeholder="Số thẻ BHYT"
              variant="outlined"
              error={!!errors.hic?.message}
              helperText={errors.hic?.message}
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
          <VaccineRegistrationTable
            columns={columns}
            data={data}
            onEdit={setOpen}
            setEditData={setEditData}
            isLoading={isLoading}
            isFetching={isFetching}
            page={page}
            setPage={setPage}
          />
        </Stack>
      </Stack>
    </Container>
  );
}
