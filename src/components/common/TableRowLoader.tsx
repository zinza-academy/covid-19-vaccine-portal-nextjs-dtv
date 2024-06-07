import { Skeleton, TableCell, TableRow } from '@mui/material';

const TableRowsLoader = ({ rowsNum = 4, colsNum }: { rowsNum?: number; colsNum: number }) => {
  return [...Array(rowsNum)].map((row, index) => (
    <TableRow key={index}>
      {[...Array(colsNum)].map((_, colIndex) => (
        <TableCell key={colIndex}>
          <Skeleton animation="wave" variant="text" />
        </TableCell>
      ))}
    </TableRow>
  ));
};

export default TableRowsLoader;
