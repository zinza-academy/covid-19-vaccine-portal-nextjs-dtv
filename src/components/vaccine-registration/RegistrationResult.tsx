import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import { AppState, useAppSelector } from '@/lib/store';
import { useCreateMutation } from '@/api/vaccination-registration';
import { useRouter } from 'next/navigation';

const RegistrationResult: FC = () => {
  const vaccinationRegistrationData = useAppSelector(
    (state: AppState) => state.vaccinationRegistration
  );

  const router = useRouter();
  const userData = useAppSelector((state: AppState) => state.auth);

  const [onSubmit, { isLoading }] = useCreateMutation();

  const handleSubmit = async () => {
    try {
      await onSubmit({
        priority_id: vaccinationRegistrationData.group_priority,
        hic: vaccinationRegistrationData.hic,
        job: vaccinationRegistrationData.job,
        workplace: vaccinationRegistrationData.working_place,
        address: vaccinationRegistrationData.address,
        appointment_date: vaccinationRegistrationData.appointment_date.toISOString(),
        user_id: userData.user.id
      }).unwrap();

      router.push('/vaccine-registration-result');
    } catch (error) {}
  };

  return (
    <Stack direction="column" spacing={2}>
      <Stack alignItems="center">
        <Stack direction="row" spacing={1}>
          <Typography fontWeight={500} fontSize={20}>
            Đăng ký tiêm chủng COVID-19 thành công. Mã đặt tiêm của bạn là
          </Typography>
          <Typography fontWeight={500} fontSize={20} color="red">
            {userData.user.citizen_id}
          </Typography>
        </Stack>
      </Stack>
      <Typography textAlign="center">
        Cảm ơn quý khách đã đăng ký tiêm chủng vắc xin COVID-19. Hiện tại Bộ y tế đang tiến hành thu
        thập nhu cầu và thông tin để lập danh sách đối tượng đăng ký tiêm vắc xin COVID-19 theo từng
        địa bàn. Chúng tôi sẽ liên hệ với quý khách theo số điện thoại 0123456789 khi có kế hoạch
        tiêm trong thời gian sớm nhất.
      </Typography>
      <Stack direction="row" spacing={1} textAlign="center" justifyContent="center">
        <Typography>Mời bạn tải ứng dụng "SỔ SỨC KHỎE ĐIỆN TỬ" tại</Typography>
        <Typography color="red">https://hssk.kcb.vn/#/sskdt</Typography>
        <Typography>
          để theo dõi kết quả đăng ký tiêm và nhận chứng nhận tiêm chủng COVID-19
        </Typography>
      </Stack>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography>Họ và tên</Typography>
          <Typography fontWeight={500}> {userData.user.full_name}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>Ngày sinh</Typography>
          <Typography fontWeight={500}>{userData.user.date_of_birth}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>Giới tính</Typography>
          <Typography fontWeight={500}>{userData.user.gender === 'male' ? 'Nam' : 'Nữ'}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography>Số CMND/CCCD/Mã định danh công dân</Typography>
          <Typography fontWeight={500}> {userData.user.citizen_id}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>Số thẻ BHYT</Typography>
          <Typography fontWeight={500}>{vaccinationRegistrationData.hic}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography>Tỉnh/Thành phố</Typography>
          <Typography fontWeight={500}>{userData.user.ward.district?.province?.name}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>Quận/Huyện</Typography>
          <Typography fontWeight={500}>{userData.user.ward.district?.name}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>Xã/Phường</Typography>
          <Typography fontWeight={500}>{userData.user.ward.name}</Typography>
        </Grid>
      </Grid>
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
        <Link href={'/'}>
          <Button
            variant="outlined"
            sx={{
              color: '#303F9F',
              borderColor: '#303F9F',
              fontSize: '15px',
              borderRadius: '8px 8px 8px 0',
              fontWeight: 500,
              backgroundColor: '#fff',
              height: '40px',
              width: 'auto',
              '&:hover': {
                backgroundColor: '#fff',
                opacity: '0.8'
              }
            }}
          >
            <ArrowBackIcon />
            Trang chủ
          </Button>
        </Link>
        <Button
          variant="outlined"
          onClick={handleSubmit}
          disabled={isLoading}
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
          Xuất thông tin
          <ArrowForwardIcon />
        </Button>
      </Stack>
    </Stack>
  );
};

export default RegistrationResult;
