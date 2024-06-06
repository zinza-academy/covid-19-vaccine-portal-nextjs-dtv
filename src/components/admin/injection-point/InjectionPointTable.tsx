import { FC } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import { LIMIT_PAGE_VACCINATION_SITE } from '@/utils/constants';
import { IInjectionPoint, IInjectionPointUpdate } from '@/types/injection-point';
import TableRowsLoader from '@/components/common/TableRowLoader';

export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'center';
}

interface ITableProp {
  columns: Column[];
  onEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setEditData: React.Dispatch<React.SetStateAction<IInjectionPointUpdate>>;
  data?: {
    data: IInjectionPoint[];
    total: number;
    limit: number;
    page: number;
  };
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  isLoading?: boolean;
  isFetching?: boolean;
}

const InjectionPointTable: FC<ITableProp> = ({
  columns,
  onEdit,
  setEditData,
  data,
  page,
  setPage,
  isLoading,
  isFetching
}) => {
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleSetEditData = (values: IInjectionPointUpdate) => {
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
              !(isLoading || isFetching) &&
              data.data.map((row, index) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    key={row.id}
                    onClick={() =>
                      handleSetEditData({
                        id: row.id,
                        manager: row.manager,
                        name: row.name,
                        number_table: row.number_table
                      })
                    }
                  >
                    <TableCell key="id">{index + 1}</TableCell>
                    <TableCell key="name" align="center">
                      {row.name}
                    </TableCell>
                    <TableCell key="house_number" align="center">
                      {row.house_number}
                    </TableCell>
                    <TableCell key="street" align="center">
                      {row.street}
                    </TableCell>
                    <TableCell key="ward" align="center">
                      {row.ward.name}
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

export default InjectionPointTable;
