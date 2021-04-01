import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {},
  heading: {
    color: theme.palette.secondary.main,
    fontWeight: 600,
  },
}))

const JurisdictionDetails = ({ match }) => {
  const classes = useStyles()
  const { jid } = match.params
  return (
    <div className={classes.root}>
      <h2 className={classes.heading}>Jurisdiction { jid }</h2>
    </div>
  )
}

export default JurisdictionDetails
