'use client';
//libs
import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { IForgotPasswordForm } from '@/types/auth';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useForgotPasswordMutation } from '@/api/auth';

export default function ForgotPassword() {
  const [forgotPassword, { error, isLoading, isSuccess }] = useForgotPasswordMutation();

  const forgotPasswordSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required')
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<IForgotPasswordForm>({
    resolver: yupResolver(forgotPasswordSchema)
  });

  const onSubmit = async (values: IForgotPasswordForm) => {
    try {
      await forgotPassword(values).unwrap();
    } catch (err) {}
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '32px',
        gap: '24px'
      }}
    >
      <Typography
        sx={{
          textAlign: 'center',
          '&::after': {
            content: '" (*)"',
            color: 'red'
          }
        }}
      >
        Để khôi phục mật khẩu, vui lòng nhập đúng email bạn đã dùng để đăng ký
      </Typography>
      {error && (
        <Alert severity="error" sx={{ width: '100%' }}>
          {error.message}
        </Alert>
      )}
      {isSuccess && (
        <Alert severity="success" sx={{ width: '100%' }}>
          An email has been sent to you with instructions to reset your password. Please check your
          inbox.
        </Alert>
      )}
      <Box
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <TextField
          {...register('email')}
          id="email"
          type="email"
          label="Email"
          placeholder="user@gmail.com"
          variant="outlined"
          error={!!errors.email?.message}
          helperText={errors.email?.message}
          sx={{
            width: '100%'
          }}
        />
        <Box
          sx={{
            display: 'flex',
            gap: '24px'
          }}
        >
          <Link href={'/login'}>
            <Button
              variant="outlined"
              sx={{
                color: '#303F9F',
                borderColor: '#303F9F',
                borderRadius: '8px 8px 8px 0',
                fontWeight: 500,
                minWidth: '90px'
              }}
            >
              Quay lại
            </Button>
          </Link>
          <Button
            disabled={isLoading || !isValid}
            type="submit"
            variant="contained"
            sx={{
              borderColor: '#303F9F',
              borderRadius: '8px 8px 8px 0',
              fontWeight: 500,
              minWidth: '90px'
            }}
          >
            Gửi
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
