import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { ReactComponent as ClockIcon } from 'assets/icons/clock.svg'
import Collapse from '@material-ui/core/Collapse'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 12,
  },
  summary: {
    display: 'flex',
    alignItems: 'center',
    cursor: ({ expandable }) => (expandable ? 'pointer' : 'default'),
    useSelect: 'none',
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
  details: {
    marginLeft: 50,
    marginTop: 10,
  },
}))

const LocationHours = ({ location, expandable }) => {
  const classes = useStyles({ expandable })
  const [expanded, setExpanded] = useState(expandable)

  const toggleDetails = () => {
    if (expandable) setExpanded(!expanded)
  }

  useEffect(() => {
    setExpanded(expandable)
  }, [location, expandable])

  return (
    <div className={classes.root}>
      <div className={classes.summary} onClick={toggleDetails}>
        <div className={classes.iconCell}>
          <ClockIcon />
        </div>
        <div className={classes.textCell}>
          <span className={classes.openStatus}>Open now</span>
          <span className={classes.openUntil}>until 9pm</span>
          <span className={classes.timezone}>(PDT)</span>
        </div>
      </div>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <div className={classes.details}>
          <div>Hours details</div>
          <div>To do</div>
        </div>
      </Collapse>
    </div>
  )
}

export default LocationHours

LocationHours.propTypes = {
  location: PropTypes.shape({}).isRequired,
  expandable: PropTypes.bool,
}

LocationHours.defaultProps = {
  expandable: false,
}
