'use client';
import { useFetchForUserQuery } from '@/api/vaccination-results';
import CertificateCard from '@/components/account/CertificateCard';
import { useAppSelector } from '@/lib/store';
import { formatTime } from '@/utils/formatTime';
import {
  Button,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import Link from 'next/link';

export default function VaccineCertificate() {
  const { data, isLoading, isFetching } = useFetchForUserQuery();
  const { user: userData } = useAppSelector((state) => state.auth);
  if (isLoading || isFetching) {
    return <LinearProgress />;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={9}>
        <Stack direction="column" spacing={4}>
          <Stack direction="column" justifyContent="center" alignItems="center">
            <Typography textTransform="uppercase">Cộng hòa xã hội chủ nghĩa Việt Nam</Typography>
            <Typography fontWeight={500}>Độc lập - Tự Do - Hạnh phúc</Typography>
          </Stack>
          <Stack>
            <Typography fontSize={24} fontWeight={500} textAlign="center">
              CHỨNG NHẬN TIÊM CHỦNG COVID-19
            </Typography>
          </Stack>
          {data && data?.length > 0 && userData && (
            <Stack direction="column" spacing={1}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Typography>Họ và tên</Typography>
                  <Typography fontWeight={500}>{data[0].user.full_name}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>Ngày sinh</Typography>
                  <Typography fontWeight={500}>{formatTime(data[0].user.date_of_birth)}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>Số CMND/CCCD</Typography>
                  <Typography fontWeight={500}>{data[0].user.citizen_id}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>Số thẻ BHYT</Typography>
                  <Typography fontWeight={500}>{data[0].vaccinationRegistration.hic}</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item>
                  <Typography>Địa chỉ </Typography>
                  <Typography fontWeight={500}>
                    {userData.ward.name} - {userData.ward.district?.name} -{' '}
                    {userData.ward.district?.province?.name}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item>
                  <Typography>Kết luận</Typography>
                  <Typography fontWeight={500}>
                    Đã được tiêm phòng vắc xin phòng bệnh Covid-19
                  </Typography>
                </Grid>
              </Grid>
            </Stack>
          )}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="vaccine_table">
              <TableHead sx={{ backgroundColor: '#EEEEEE' }}>
                <TableRow sx={{ fontWeight: 500 }}>
                  <TableCell size="small" align="center">
                    Mũi số
                  </TableCell>
                  <TableCell align="center">Thời gian tiêm</TableCell>
                  <TableCell align="center">Tên Vắc xin</TableCell>
                  <TableCell align="center">Số lô</TableCell>
                  <TableCell align="center">Nơi tiêm</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell size="small" align="center">
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">{row.time}</TableCell>
                      <TableCell align="center">{row.vaccinationType.name}</TableCell>
                      <TableCell align="center">{row.lot}</TableCell>
                      <TableCell align="center">{row.vaccinationSite.name}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack direction="row" justifyContent="center">
            <Link href={'/vaccine-registration'}>
              <Button
                variant="outlined"
                sx={{
                  color: '#fff',
                  borderColor: '#fff',
                  fontSize: '15px',
                  borderRadius: '8px 8px 8px 0',
                  fontWeight: 500,
                  backgroundColor: '#303F9F',
                  '&:hover': {
                    backgroundColor: '#303F9F',
                    opacity: '0.9'
                  }
                }}
              >
                Đăng ký mũi tiêm tiếp theo
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={3}>
        <CertificateCard data={userData} doseNumber={data?.length || 0} />
      </Grid>
    </Grid>
  );
}
