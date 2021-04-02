import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const EditJurisdiction = ({ wipJurisdiction }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div>{ wipJurisdiction.name }: { wipJurisdiction.id }</div>
    </div>
  )
}

export default EditJurisdiction
