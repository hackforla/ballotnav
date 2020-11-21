import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: '#FFFFFF',
    padding: '20px 15px',
  },
}))

const JurisdictionSelect = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      Select jurisdiction
    </div>
  )
}

export default JurisdictionSelect
