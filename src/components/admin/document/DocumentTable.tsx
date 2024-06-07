import { FC } from 'react';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import { IDocument, IDocumentColumn, IDocumentUpdate } from '@/types/document';
import TableRowsLoader from '@/components/common/TableRowLoader';
import { useRouter } from 'next/navigation';

interface ITableProp {
  columns: IDocumentColumn[];
  data?: IDocument[];
  onEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setEditData: React.Dispatch<React.SetStateAction<IDocumentUpdate>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  isLoading?: boolean;
  isFetching?: boolean;
}

const DocumentTable: FC<ITableProp> = ({
  columns,
  data,
  onEdit,
  setEditData,
  page,
  setPage,
  isLoading,
  isFetching
}) => {
  const router = useRouter();
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleSetEditData = (values: any) => {
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
                <TableCell key={column.id} align="center" style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(isLoading || isFetching) && <TableRowsLoader colsNum={columns.length} />}
            {data &&
              !(isLoading || isFetching) &&
              data.map((row, index) => {
                return (
                  <TableRow hover role="checkbox" key={row.id}>
                    <TableCell key="id">{index + 1}</TableCell>
                    <TableCell key="name" align="center">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        color="secondary"
                        onClick={() =>
                          handleSetEditData({
                            id: row.id,
                            name: row.name
                          })
                        }
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell key="street" align="center">
                      <Button
                        onClick={() =>
                          router.push(`${process.env.BASE_URL}/documents/download/${row.id}`)
                        }
                      >
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[6]}
        component="div"
        count={data?.length || 0}
        rowsPerPage={10}
        page={page}
        onPageChange={handleChangePage}
      />
    </Paper>
  );
};

export default DocumentTable;
