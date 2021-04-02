import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const EditSubmodels = ({ jurisdiction }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      EditSubmodels
    </div>
  )
}

export default EditSubmodels
