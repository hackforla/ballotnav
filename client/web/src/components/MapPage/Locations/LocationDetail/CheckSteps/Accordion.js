import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import MuiAccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const Accordion = withStyles((theme) => ({
  root: {
    border: `1px solid ${theme.palette.primary.main}`,
    boxShadow: 'none',
    borderRadius: '12px !important',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
}))(MuiAccordion)

const AccordionSummary = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: 9,
    minHeight: 48,
    '&$expanded': {
      minHeight: 48,
    },
  },
  content: {
    color: '#FFF',
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
  expandIcon: {
    color: '#FFF',
  },
}))(MuiAccordionSummary)

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    color: theme.palette.primary.main,
  },
}))(MuiAccordionDetails)

const CustomAccordion = ({ title, children }) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="check-your-steps"
        id="check-your-steps-header"
      >
        <Typography>Check your steps</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div>{children}</div>
      </AccordionDetails>
    </Accordion>
  )
}

export default CustomAccordion
