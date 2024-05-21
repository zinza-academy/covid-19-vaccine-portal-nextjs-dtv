'use client';
//libs
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormHelperText
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useForm, Controller, useWatch, Control } from 'react-hook-form';
import * as yup from 'yup';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { IRegisterError, IUserRegisterForm } from '@/types/auth';
import { useFetchDistrictQuery, useFetchProvinceQuery, useFetchWardQuery } from '@/api/address';
import { useEffect, useState } from 'react';
import { IProvince } from '@/types/address';
import { useRegisterMutation } from '@/api/auth';

export default function LoginPage() {
  const [registerError, setRegisterError] = useState('');

  const registerSchema = yup.object().shape({
    citizen_id: yup
      .string()
      .required('Citizen ID is require')
      .matches(/^\d{9}$|^\d{12}$/, 'Citizen ID must contain 9 or 12 digits'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
      .string()
      .required('Password is require')
      .min(8, 'Password must be at least 8 characters')
      .test('no-spaces', 'Password cannot contain spaces', (value) => !value.includes(' ')),
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
    watch,
    formState: { errors, isValid }
  } = useForm<IUserRegisterForm>({
    mode: 'onChange',
    defaultValues: {
      citizen_id: '',
      email: '',
      password: '',
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

  const [onRegister, { isLoading, error }] = useRegisterMutation();

  const onSubmit = async (values: IUserRegisterForm) => {
    try {
      await onRegister(values).unwrap();
    } catch (error) {
      console.log(error);
      setRegisterError('User already exists');
      window.scrollTo({
        top: 0,
        behavior: 'auto'
      });
    }
  };
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '84px 32px',
        gap: '24px'
      }}
    >
      <Typography
        sx={{
          textAlign: 'center',
          fontSize: '20px',
          fontWeight: '600'
        }}
      >
        Đăng ký tài khoản
      </Typography>

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
        {registerError && (
          <Typography
            sx={{
              color: 'red',
              textAlign: 'center',
              fontSize: '14px',
              display: 'block',
              paddingY: '15px',
              width: '100%',
              borderRadius: '4px',
              fontWeight: '500',
              backgroundColor: 'rgba(247,9,9,0.06)'
            }}
          >
            {registerError}
          </Typography>
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
            Mật khẩu
          </FormLabel>
          <TextField
            {...register('password')}
            id="password"
            type="password"
            placeholder="password"
            variant="outlined"
            error={!!errors.password?.message}
            helperText={errors.password?.message}
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
            Giới tính
          </FormLabel>
          <TextField
            {...register('gender')}
            id="date"
            type="text"
            placeholder="male/female"
            variant="outlined"
            error={!!errors.gender?.message}
            helperText={errors.gender?.message}
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
            {isLoading ? 'Loading...' : 'Tiếp tục'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
