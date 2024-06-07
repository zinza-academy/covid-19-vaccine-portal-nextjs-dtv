import { FC } from 'react';
import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import { IVaccineRegistrationColumn } from '@/types/vaccine';
import { IVaccinationRegistrationResult } from '@/types/vaccination-registration';
import TableRowsLoader from '@/components/common/TableRowLoader';
import { LIMIT_PAGE_VACCINATION_SITE } from '@/utils/constants';

interface ITableProp {
  columns: IVaccineRegistrationColumn[];
  data?: {
    data: IVaccinationRegistrationResult[];
    total: number;
    limit: number;
    page: number;
  };
  onEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setEditData: React.Dispatch<React.SetStateAction<IVaccinationRegistrationResult | null>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  isLoading?: boolean;
  isFetching?: boolean;
}

const VaccineRegistrationTable: FC<ITableProp> = ({
  columns,
  data,
  onEdit,
  setEditData,
  isLoading,
  isFetching,
  page,
  setPage
}) => {
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleEditData = (values: IVaccinationRegistrationResult) => {
    setEditData(values);
    onEdit(true);
  };
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(isLoading || isFetching) && <TableRowsLoader colsNum={columns.length} />}
            {data &&
              data.data.map((row, index) => {
                return (
                  <TableRow hover role="checkbox" key={row.id} onClick={() => handleEditData(row)}>
                    <TableCell key="id">{index + 1}</TableCell>
                    <TableCell key="name" align="center">
                      {row.user.full_name}
                    </TableCell>
                    <TableCell key="hic" align="center">
                      {row.hic}
                    </TableCell>
                    <TableCell key="priorityGroup" align="center">
                      {row.priorityGroup.name}
                    </TableCell>
                    <TableCell key="appointmentDate" align="center">
                      {row.vaccinationResult?.time}
                    </TableCell>
                    <TableCell key="session" align="center">
                      {row.vaccinationSession?.name}
                    </TableCell>
                    <TableCell key="number_table" align="center">
                      {row.vaccinationResult ? (
                        <Chip label="Đã tiêm" color="success" variant="outlined" />
                      ) : (
                        <Chip label="Chưa tiêm" color="warning" variant="outlined" />
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[LIMIT_PAGE_VACCINATION_SITE]}
        component="div"
        count={data?.total || 0}
        rowsPerPage={data?.limit || LIMIT_PAGE_VACCINATION_SITE}
        page={data ? data.page - 1 : 0}
        onPageChange={handleChangePage}
      />
    </Paper>
  );
};

export default VaccineRegistrationTable;
