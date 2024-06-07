'use client';

import { useResetPasswordMutation } from '@/api/auth';
import { IResetPasswordForm } from '@/types/auth';
import { RESET_PASSWORD_TOKEN } from '@/utils/constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, Button, FormLabel, Stack, TextField, Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const [onResetPassword, { error, isSuccess, isLoading }] = useResetPasswordMutation();

  const resetPasswordSchema = yup.object().shape({
    password: yup
      .string()
      .required('Password is require')
      .min(8, 'Password must be at least 8 characters')
      .test('no-spaces', 'Password cannot contain spaces', (value) => !value.includes(' ')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Re-entering your password is required')
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<IResetPasswordForm>({
    mode: 'onChange',
    defaultValues: {
      password: '',
      confirmPassword: ''
    },
    resolver: yupResolver(resetPasswordSchema)
  });

  const onSubmit = async (values: IResetPasswordForm) => {
    try {
      await onResetPassword({
        ...values,
        token: searchParams.get(RESET_PASSWORD_TOKEN) || ''
      });
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
      <Stack sx={{ width: '100%' }} alignItems="center">
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: '20px',
            fontWeight: '500',
            paddingBottom: '20px'
          }}
        >
          Enter your new password
        </Typography>
        {error && (
          <Alert severity="error" sx={{ width: '100%', maxWidth: '600px' }}>
            {error.message}
          </Alert>
        )}
        {isSuccess && (
          <Alert severity="success" sx={{ width: '100%', maxWidth: '600px' }}>
            Your password has been successfully reset.
          </Alert>
        )}
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: '600px',
            paddingTop: '20px'
          }}
        >
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
              New Password
            </FormLabel>
            <TextField
              {...register('password')}
              id="password"
              type="password"
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
              New Password(Confirmation)
            </FormLabel>
            <TextField
              {...register('confirmPassword')}
              id="confirmPassword"
              type="password"
              variant="outlined"
              error={!!errors.confirmPassword?.message}
              helperText={errors.confirmPassword?.message}
              sx={{
                width: '100%',
                marginTop: '6px'
              }}
            />
          </Box>
          <Box
            sx={{
              width: '100%',
              paddingBottom: '100px',
              display: 'flex'
            }}
          >
            <Button
              disabled={!isValid || isLoading}
              type="submit"
              variant="outlined"
              fullWidth
              sx={{
                backgroundColor: '#5353e9',
                color: '#fff',
                py: 2,
                '&:hover': {
                  backgroundColor: '#6a6aec',
                  color: '#fff'
                },
                '&.Mui-disabled': {
                  backgroundColor: '#f0f0f0',
                  color: '#a0a0a0'
                }
              }}
            >
              Reset Password
            </Button>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
