import { IVaccinationRegistrationResult } from '@/types/vaccination-registration';
import { formatTime } from '@/utils/formatTime';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { FC } from 'react';

interface IProp {
  data?: IVaccinationRegistrationResult[];
}

const VaccinationResultTable: FC<IProp> = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, fontSize: '16px !important' }} aria-label="vaccine_table">
        <TableHead sx={{ backgroundColor: '#EEEEEE' }}>
          <TableRow sx={{ fontWeight: 500 }}>
            <TableCell size="small" align="center">
              STT
            </TableCell>
            <TableCell align="center">Họ và tên</TableCell>
            <TableCell align="center">Ngày sinh </TableCell>
            <TableCell align="center">Giới tính</TableCell>
            <TableCell align="center">Số CMND/CCCD/Mã định danh công dân</TableCell>
            <TableCell align="center">Ngày muốn tiêm</TableCell>
            <TableCell align="center">Trạng thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((row, index) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell size="small" align="center">
                  {index + 1}
                </TableCell>
                <TableCell align="center">{row.user.full_name}</TableCell>
                <TableCell align="center">{formatTime(row.user.date_of_birth)}</TableCell>
                <TableCell align="center">{row.user.gender === 'male' ? 'Nam' : 'Nữ'}</TableCell>
                <TableCell align="center">{row.user.citizen_id}</TableCell>
                <TableCell align="center">
                  {row.appointment_date && formatTime(row.appointment_date)}
                </TableCell>
                <TableCell align="center">
                  <Typography
                    sx={{
                      backgroundColor: '#E8EAF6',
                      borderRadius: '30px',
                      border: '1px solid #3F51B5'
                    }}
                  >
                    Đăng ký thành công
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VaccinationResultTable;
