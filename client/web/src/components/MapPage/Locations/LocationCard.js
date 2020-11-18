import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    padding: 5,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'grey',
    }
  },
})

const LocationCard = ({ location, selectLocation }) => {
  const classes = useStyles()
  return (
    <div
      className={classes.root}
      onClick={selectLocation}
    >
      <Typography
        style={{ fontWeight: 'bold' }}
        color='primary'
        variant='subtitle1'
      >
        { location.name }
      </Typography>
      <div>
        { location.address1 }, { location.address2 } { location.city }, { location.state } { location.zip }
      </div>
    </div>
  )
}

export default LocationCard
