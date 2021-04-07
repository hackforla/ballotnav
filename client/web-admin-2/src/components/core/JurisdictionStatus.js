import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(({ palette: { jurisdictionStatuses } }) => ({
  root: {
    color: ({ status }) => jurisdictionStatuses[status]?.text,
    backgroundColor: ({ status }) => jurisdictionStatuses[status]?.background,
    padding: '2px 1em 1px',
    borderRadius: '1em',
    textTransform: 'uppercase',
    fontSize: 12,
    display: 'inline-block',
  },
}))

const JurisdictionStatus = ({ status }) => {
  const classes = useStyles({ status })

  return <div className={classes.root}>{status}</div>
}

export default JurisdictionStatus
