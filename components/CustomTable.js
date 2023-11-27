import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function CustomTable(props) {
  const {columns, rows, style = {}} = props;  

  return (
    <>
    <div style={{overflowY: 'auto'}}>
      <TableContainer component={Paper}>
        <Table>
            <Box sx={{ margin: 1 }}>
                <TableHead style={{display: "flex"}}>
                    <div style={{width: '100%', ...(style.head||{})}}>
                        <TableRow style={{display: "flex"}}>
                            {
                                columns && columns.length &&
                                columns.map((col, i) => <TableCell key = {`table_cell_column_${i}`} style={{fontWeight: 'bold', width: "100%", display: "flex", justifyContent: "center"}}>{col}</TableCell>)
                            }
                        </TableRow>
                    </div>
                </TableHead>
                <TableBody style={{display: "flex"}}>
                    <div style={{width: '100%', ...(style.body||{})}}>
                        {
                            rows && rows.length &&
                            rows.map((row, j) => 
                                <TableRow key={`table_row_${j}`} style={{display: "flex"}}>
                                    {
                                        row && row.length &&
                                        row.map((cell, i) => 
                                            <TableCell key={`table_cell_row_${i}`} style={{fontWeight: 'bold', width: "100%", display: "flex", justifyContent: "center"}}>{cell}</TableCell>
                                        )
                                    }
                                </TableRow>
                            )
                        }
                    </div>
                </TableBody>
            </Box>
        </Table>
      </TableContainer>
    </div>
    </>
  );
}