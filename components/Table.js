import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';
import toString from 'lodash/toString';
import get from 'lodash/get';

function Row(props) {
  const { row, name } = props;
  const [open, setOpen] = React.useState(false);
  const [keys, setKeys] = React.useState(Object.keys(row));

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component="th" scope="row">
          {name || JSON.stringify(row).substring(0, 50)}
        </TableCell>
        <TableCell component="th" scope="row" max>
          {`${JSON.stringify(row).substring(0, 75)}${JSON.stringify(row).length > 75 ? '...}':''}`}
        </TableCell>   
        <TableCell component="th" scope="row">
          {
            isArray(row) 
              ? 'array' 
              : (
                isObject(row)
                ? 'object'
                : 'property'
              )
          }
        </TableCell>        
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell style={{fontWeight: 'bold'}}>Field</TableCell>
                    <TableCell style={{fontWeight: 'bold'}}>Value</TableCell>
                    <TableCell style={{fontWeight: 'bold'}}>Type</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {keys.map((keyRow) => {
                    if(isObject(get(row, keyRow))) return <Row name = {keyRow} row =  {get(row, keyRow) } />
                    return <TableRow key={get(row, '_id', 0)}>
                      <TableCell>{keyRow}</TableCell>
                      <TableCell align="left">{toString(get(row, keyRow) === null ? 'null' : get(row, keyRow))}</TableCell>
                      <TableCell align="left">property</TableCell>
                    </TableRow>
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable(props) {
  const {key, rows} = props;  
  const [mini, setMini] = React.useState(true);
  return (
    <>
     <div className="form-check">
        <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckChecked"
            defaultChecked = {mini}
            onChange={() => setMini(!mini)}
        />
        <label
            className="form-check-label"
            htmlFor="flexCheckChecked"
            style={{ color: "black" }}
        >
            Modo MiniTabla
        </label>
    </div>
    <div className={`${mini ? `scroller` : `noscroller`}-table-container`}>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableBody>
            {rows.map((row) => (
              <Row name = {`_id: ${get(row, '_id', 'field')}`} key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    </>
  );
}