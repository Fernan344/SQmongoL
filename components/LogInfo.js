import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Form from 'react-bootstrap/Form';
import Table from './Table'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  const [value, setValue] = React.useState(0);  
  const { queryResults, log } = props.states;

  React.useEffect(() => {setValue(0)}, [queryResults])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Log" {...a11yProps(0)} />
          {
            Array.from(new Array(queryResults.length), (_, i) => {
              return <Tab label="Results" {...a11yProps(i+1)} key={`tab_${i}`}/>
            })
          }          
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control as="textarea" rows={15} disabled value={log}/>
      </Form.Group>
      </TabPanel>
      {
        queryResults.map((result, i) => {
          return <TabPanel value={value} index={i+1} key={`tabpane_${i}`}>
            <Table key={`table_${i}`} rows={result}/>
          </TabPanel>
          
        })
      }
    </Box>
  );
}