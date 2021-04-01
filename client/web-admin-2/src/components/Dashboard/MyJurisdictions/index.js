import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {},
  heading: {
    color: theme.palette.secondary.main,
    fontWeight: 600,
  },
}))

const MyJurisdictions = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <h1 className={classes.heading}>My Jurisdictions</h1>
    </div>
  )
}

export default MyJurisdictions
