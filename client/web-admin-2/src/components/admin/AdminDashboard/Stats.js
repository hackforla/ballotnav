import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    height: 150,
    border: `1px ${theme.palette.primary.main} solid`,
    borderRadius: 10,
    padding: '1em',
    marginBottom: '3em',
  },
}))

const JurisdictionStats = ({ jurisdictions }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      Stats
    </div>
  )
}

export default JurisdictionStats
