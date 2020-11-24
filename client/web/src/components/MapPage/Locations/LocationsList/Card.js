import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import LocationName from '../shared/LocationName'
import LocationAddress from '../shared/LocationAddress'
import LocationHours from '../shared/LocationHours'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '10px 10px 10px 0',
    // cursor: 'pointer',
    // '&:hover': {
    //   backgroundColor: 'lightgrey',
    // }
  },
  link: {
    color: theme.palette.link.main,
    fontSize: 16,
    fontWeight: 400,
    textAlign: 'right',
    textDecoration: 'underline',
    cursor: 'pointer',
    userSelect: 'none',
  },
}))

const Card = ({ location, selectLocation }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <LocationName location={location} />
      <LocationAddress location={location} />
      <LocationHours location={location} />
      <div onClick={selectLocation} className={classes.link}>
        Get location requirements, hours and directions
      </div>
    </div>
  )
}

export default Card

Card.propTypes = {
  location: PropTypes.shape({}).isRequired,
  selectLocation: PropTypes.func.isRequired,
}
