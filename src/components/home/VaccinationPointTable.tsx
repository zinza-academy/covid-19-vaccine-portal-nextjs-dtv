import { FC, useState } from 'react';
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import { useFetchAllVaccinationSitesQuery } from '@/api/vaccination-sites';
import { LIMIT_PAGE_VACCINATION_SITE } from '@/utils/constants';

export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'center';
}

interface ITableProp {
  columns: Column[];
  ward: string;
}

const VaccinationPointTable: FC<ITableProp> = ({ columns, ward }) => {
  const [page, setPage] = useState(0);

  const { data, isLoading, isFetching } = useFetchAllVaccinationSitesQuery({
    page: page + 1,
    ward
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  if (isLoading || isFetching) {
    return <CircularProgress />;
  }

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
            {data &&
              data.data.map((row, index) => {
                return (
                  <TableRow hover role="checkbox" key={row.id}>
                    <TableCell key="id">{index + 1}</TableCell>
                    <TableCell key="name" align="center">
                      {row.name}
                    </TableCell>
                    <TableCell key="street" align="center">
                      {row.street}
                    </TableCell>
                    <TableCell key="ward" align="center">
                      {row.ward.name}
                    </TableCell>
                    <TableCell key="district" align="center">
                      {row.ward.district?.name}
                    </TableCell>
                    <TableCell key="district" align="center">
                      {row.ward.district?.province?.name}
                    </TableCell>
                    <TableCell key="manager" align="center">
                      {row.manager}
                    </TableCell>
                    <TableCell key="number_table" align="center">
                      {row.number_table}
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

export default VaccinationPointTable;
