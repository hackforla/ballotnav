import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const ReviewJurisdictions = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      ReviewJurisdictions
    </div>
  )
}

export default ReviewJurisdictions
