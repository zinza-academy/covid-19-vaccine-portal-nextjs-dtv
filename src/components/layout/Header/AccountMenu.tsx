'use client';
import { useLogoutMutation } from '@/api/auth';
import { logout, selectAuthData } from '@/lib/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { Roles } from '@/utils/constants';
import { Box, Button, Divider, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

const AccountMenu: FC = () => {
  const user = useAppSelector(selectAuthData);
  const [onLogout] = useLogoutMutation();
  const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' });
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await onLogout().unwrap();
      dispatch(logout());
      router.push('/');
      localStorage.clear();
    } catch (error) {}
  };

  return (
    <Box>
      {user && user.user && user.user.full_name ? (
        <Box sx={{ height: '100%' }}>
          <Box {...bindTrigger(popupState)} sx={{ height: '100%', cursor: 'pointer' }}>
            <Stack direction={'row'} color={'#fff'}>
              <Typography textTransform={'none'} fontSize={'15px'}>
                {user.user.full_name}
              </Typography>
            </Stack>
          </Box>
          <Menu
            {...bindMenu(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            sx={{
              '& .MuiPopover-paper': {
                borderRadius: '12px'
              }
            }}
          >
            {user.user.role === Roles.ADMIN && (
              <Box>
                <MenuItem onClick={popupState.close} sx={{ width: '150px' }}>
                  <Link
                    href="/admin/injection-point"
                    style={{ textDecoration: 'none', color: '#000' }}
                  >
                    <Stack direction={'column'}>
                      <Typography fontSize={'16px'}>Dashboard</Typography>
                    </Stack>
                  </Link>
                </MenuItem>
                <Divider variant="middle" />
              </Box>
            )}
            <MenuItem onClick={popupState.close} sx={{ width: '150px' }}>
              <Link href="/account" style={{ textDecoration: 'none', color: '#000' }}>
                <Stack direction={'column'}>
                  <Typography fontSize={'16px'}>Profile</Typography>
                </Stack>
              </Link>
            </MenuItem>
            <Divider variant="middle" />
            <MenuItem onClick={popupState.close}>
              <Box onClick={handleLogout}>
                <Stack direction={'column'}>
                  <Typography fontSize={'16px'}>Đăng xuất</Typography>
                </Stack>
              </Box>
            </MenuItem>
          </Menu>
        </Box>
      ) : (
        <Link href={'/login'}>
          <Button
            variant="outlined"
            sx={{
              color: '#303F9F',
              borderColor: '#303F9F',
              fontSize: '15px',
              borderRadius: '8px 8px 8px 0',
              fontWeight: 500,
              backgroundColor: '#fff',
              '&:hover': {
                backgroundColor: '#fff',
                opacity: '0.9'
              }
            }}
          >
            Đăng nhập
          </Button>
        </Link>
      )}
    </Box>
  );
};

export default AccountMenu;
