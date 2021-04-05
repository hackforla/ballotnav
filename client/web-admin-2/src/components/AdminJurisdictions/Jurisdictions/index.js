import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const Jurisdictions = ({ jurisdictions }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      Jurisdictions
    </div>
  )
}

export default Jurisdictions
