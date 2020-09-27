import React from 'react'
import { Box } from '@material-ui/core'

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          { children }
        </Box>
      )}
    </div>
  );
}

export default TabPanel
