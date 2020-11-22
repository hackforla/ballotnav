import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { ReactComponent as ClockIcon } from 'assets/icons/clock.svg'
import LocationName from '../shared/LocationName'
import LocationAddress from '../shared/LocationAddress'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '10px 10px 10px 0',
    // cursor: 'pointer',
    // '&:hover': {
    //   backgroundColor: 'lightgrey',
    // }
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconCell: {
    width: 50,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCell: {
    flex: 1,
  },
  link: {
    color: theme.palette.link.main,
    fontSize: 16,
    fontWeight: 400,
    textAlign: 'right',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  openStatus: {
    color: '#63A375',
    fontWeight: 600,
    fontSize: 16,
    display: 'inline-block',
    marginRight: 10,
  },
  openUntil: {
    color: '#1C1C1C',
    fontWeight: 400,
    fontSize: 16,
    display: 'inline-block',
    marginRight: 10,
  },
  timezone: {
    color: '#808080',
    fontWeight: 400,
    fontSize: 16,
  },
}))

const Card = ({ location, selectLocation }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <LocationName location={location} />
      <LocationAddress location={location} />
      <div className={classes.row}>
        <div className={classes.iconCell}>
          <ClockIcon />
        </div>
        <div className={classes.textCell}>
          <span className={classes.openStatus}>Open now</span>
          <span className={classes.openUntil}>until 9pm</span>
          <span className={classes.timezone}>(PDT)</span>
        </div>
      </div>
      <div onClick={selectLocation} className={classes.link}>
        Get location requirements, hours and directions
      </div>
    </div>
  )
}

export default Card

Card.propTypes = {
  location: PropTypes.shape({}).isRequired,
}
