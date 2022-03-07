import { Stack, Button, Box,Link } from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';
import { getCompaniesFromAPI } from './utils/api';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function App() {
  const { data, refetch } = useQuery('companies', getCompaniesFromAPI);

  if (!data) return <div>loading...</div>;
  console.log(data);

  return (
    <Stack gap={2} sx={{ m: 1 }}>
      <Box>
        <Button variant='contained' onClick={refetch}>
          Refresh
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table' size='small'>
          <TableHead>
            <TableRow>
              <StyledTableCell align='left'>Name</StyledTableCell>
              <StyledTableCell align='left'>Contact</StyledTableCell>
              <StyledTableCell align='left'>Country</StyledTableCell>
              <StyledTableCell align='left'>Website</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row => (
              <StyledTableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell
                  sx={{
                    backgroundColor: 'theme.palette.common.black',
                  }}
                  align='left'
                >
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align='left'>
                  {row.contact.firstname} {row.contact.lastname}
                </StyledTableCell>
                <StyledTableCell align='left'>{row.country}</StyledTableCell>
                <StyledTableCell align='left'>{row.website}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

export default App;
