'use client';

import { useFetchDistrictQuery, useFetchProvinceQuery, useFetchWardQuery } from '@/api/address';
import { useFetchProfileQuery } from '@/api/auth';
import { useUpdateProfileMutation } from '@/api/user';
import { IUpdateUserForm } from '@/types/user';
import { genders } from '@/utils/constants';
import { formatTime } from '@/utils/formatTime';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  LinearProgress,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

export default function Account() {
  const {
    data: user,
    isLoading: isLoadingUser,
    isFetching: isFetchingUser,
    refetch
  } = useFetchProfileQuery();

  const [onUpdate, { isLoading, isError, error, isSuccess }] = useUpdateProfileMutation();

  const registerSchema = yup.object().shape({
    citizen_id: yup
      .string()
      .required('Citizen ID is require')
      .matches(/^\d{9}$|^\d{12}$/, 'Citizen ID must contain 9 or 12 digits'),
    email: yup.string().email('Invalid email').required('Email is required'),
    full_name: yup.string().required('Name is require'),
    date_of_birth: yup.mixed<Dayjs>().required('Date of birth is invalid'),
    gender: yup.string().required('Gender is require'),
    province_id: yup.string().required('Province is require'),
    district_id: yup.string().required('District is require'),
    ward_id: yup.string().required('Ward is require')
  });
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isValid }
  } = useForm<IUpdateUserForm>({
    mode: 'onChange',
    defaultValues: {
      citizen_id: '',
      email: '',
      full_name: '',
      date_of_birth: dayjs(),
      gender: '',
      province_id: '',
      district_id: '',
      ward_id: ''
    },
    resolver: yupResolver(registerSchema)
  });

  const watchProvince = watch('province_id');
  const watchDistrict = watch('district_id');

  const { data: provinces } = useFetchProvinceQuery();
  const { data: districts } = useFetchDistrictQuery({
    province_id: watchProvince
  });
  const { data: wards } = useFetchWardQuery({
    district_id: watchDistrict
  });

  React.useEffect(() => {
    if (user) {
      reset({
        citizen_id: user.citizen_id,
        email: user.email,
        full_name: user.full_name,
        date_of_birth: dayjs(user.date_of_birth),
        gender: user.gender,
        ward_id: user.ward.id,
        province_id: user.ward.district?.province?.id,
        district_id: user.ward.district?.id
      });
    }
  }, [user, reset]);

  if (isLoadingUser || isFetchingUser) {
    return <LinearProgress />;
  }
  if (!user) {
    return <Typography>Empty</Typography>;
  }

  const onSubmit = async (values: IUpdateUserForm) => {
    try {
      await onUpdate({ id: user.id, ...values }).unwrap();
      await refetch();
    } catch (error) {}
  };

  return (
    <Stack spacing={2}>
      <Stack spacing={2}>
        <Typography fontSize="24px">Thông tin cá nhân</Typography>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography>Họ và tên</Typography>
            <Typography fontWeight={500}>{user.full_name}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>Ngày sinh</Typography>
            <Typography fontWeight={500}>{formatTime(user.date_of_birth)}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>Số CMND/CCCD</Typography>
            <Typography fontWeight={500}>{user.citizen_id}</Typography>
          </Grid>
          <Grid item>
            <Typography>Địa chỉ </Typography>
            <Typography fontWeight={500}>
              {user.ward.name} - {user.ward.district?.name} - {user.ward.district?.province?.name}
            </Typography>
          </Grid>
        </Grid>
      </Stack>

      <Stack spacing={2}>
        <Typography fontSize="24px">Cập nhật thông tin cá nhân</Typography>
        <Box
          onSubmit={handleSubmit(onSubmit)}
          component="form"
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: '400px'
          }}
        >
          {error && (
            <Alert severity="error" sx={{ width: '100%' }}>
              {error.message}
            </Alert>
          )}
          {isSuccess && (
            <Alert severity="success" sx={{ width: '100%' }}>
              Successfully
            </Alert>
          )}

          <Box sx={{ width: '100%' }}>
            <FormLabel
              sx={{
                color: '#000',
                '&::after': {
                  content: '" (*)"',
                  color: 'red'
                }
              }}
            >
              Số CMND/CCCD
            </FormLabel>
            <TextField
              {...register('citizen_id')}
              id="citizenId"
              type="text"
              placeholder="Số CMND/CCCD"
              variant="outlined"
              error={!!errors.citizen_id?.message}
              helperText={errors.citizen_id?.message}
              sx={{
                width: '100%',
                marginTop: '6px'
              }}
            />
          </Box>
          <Box sx={{ width: '100%' }}>
            <FormLabel
              sx={{
                color: '#000',
                '&::after': {
                  content: '" (*)"',
                  color: 'red'
                }
              }}
            >
              Email
            </FormLabel>
            <TextField
              {...register('email')}
              id="email"
              type="email"
              placeholder="user@gmail.com"
              variant="outlined"
              error={!!errors.email?.message}
              helperText={errors.email?.message}
              sx={{
                width: '100%',
                marginTop: '6px'
              }}
            />
          </Box>
          <Box sx={{ width: '100%' }}>
            <FormLabel
              sx={{
                color: '#000',
                '&::after': {
                  content: '" (*)"',
                  color: 'red'
                }
              }}
            >
              Họ và tên
            </FormLabel>
            <TextField
              {...register('full_name')}
              id="name"
              type="text"
              placeholder="Họ và tên"
              variant="outlined"
              error={!!errors.full_name?.message}
              helperText={errors.full_name?.message}
              sx={{
                width: '100%',
                marginTop: '6px'
              }}
            />
          </Box>
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <FormLabel
              sx={{
                color: '#000',
                '&::after': {
                  content: '" (*)"',
                  color: 'red'
                }
              }}
            >
              Ngày sinh
            </FormLabel>
            <Controller
              name="date_of_birth"
              control={control}
              render={({ field, fieldState }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker disableFuture {...field} format="DD/MM/YYYY" />
                </LocalizationProvider>
              )}
            />
          </Box>

          <Stack direction="column" spacing={1} width="100%">
            <FormLabel sx={{ color: 'black' }}>Giới tính</FormLabel>
            <Controller
              control={control}
              name="gender"
              render={({ field }) => (
                <FormControl>
                  <Select
                    id="gender"
                    {...field}
                    error={!!errors.gender?.message}
                    sx={{
                      '& .MuiSelect-select .notranslate::after': {
                        content: `"Buổi tiêm mong muốn"`,
                        opacity: 0.42
                      }
                    }}
                  >
                    {genders.map((item) => (
                      <MenuItem key={item.id} value={item.value}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Stack>
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <FormLabel
              sx={{
                color: '#000',
                '&::after': {
                  content: '" (*)"',
                  color: 'red'
                }
              }}
            >
              Tỉnh/Thành phố
            </FormLabel>
            <Controller
              control={control}
              name="province_id"
              render={({ field }) => (
                <FormControl>
                  <Select id="city" {...field} error={!!errors.province_id?.message}>
                    {provinces &&
                      provinces.map((province) => (
                        <MenuItem key={province.id} value={province.id}>
                          {province.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              )}
            />
          </Box>
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <FormLabel
              sx={{
                color: '#000',
                '&::after': {
                  content: '" (*)"',
                  color: 'red'
                }
              }}
            >
              Quận/Huyện
            </FormLabel>
            <Controller
              control={control}
              name="district_id"
              render={({ field }) => (
                <FormControl>
                  <Select id="city" {...field} error={!!errors.province_id?.message}>
                    {districts &&
                      districts.map((district) => (
                        <MenuItem key={district.id} value={district.id}>
                          {district.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              )}
            />
          </Box>
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <FormLabel
              sx={{
                color: '#000',
                '&::after': {
                  content: '" (*)"',
                  color: 'red'
                }
              }}
            >
              Xã/Phường
            </FormLabel>
            <Controller
              control={control}
              name="ward_id"
              render={({ field }) => (
                <FormControl>
                  <Select id="ward" {...field} error={!!errors.ward_id?.message}>
                    {wards &&
                      wards.map((ward) => (
                        <MenuItem key={ward.id} value={ward.id}>
                          {ward.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              )}
            />
          </Box>
          <Box
            sx={{
              width: '100%',
              paddingBottom: '100px',
              display: 'flex',
              justifyContent: 'end'
            }}
          >
            <Button
              disabled={!isValid || isLoading}
              type="submit"
              variant="outlined"
              sx={{
                color: 'blue'
              }}
            >
              {isLoading ? 'Loading...' : 'Cập nhật'}
            </Button>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
}
