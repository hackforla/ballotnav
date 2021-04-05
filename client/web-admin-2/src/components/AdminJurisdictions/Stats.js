import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const JurisdictionStats = ({ jurisdictions }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      JurisdictionStats
    </div>
  )
}

export default JurisdictionStats
