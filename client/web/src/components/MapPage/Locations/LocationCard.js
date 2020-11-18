import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    border: '1px grey solid',
    borderRadius: 5,
  },
})

const LocationCard = ({ location, selectLocation }) => {
  const classes = useStyles()
  return (
    <div
      className={classes.root}
      onClick={selectLocation}
    >
      { location.name }
    </div>
  )
}

export default LocationCard
