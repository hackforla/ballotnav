import React, { useState, useEffect, useCallback } from 'react'
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
  },
  iconCell: {
    width: 50,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCell: {},
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
  toggle: {
    color: theme.palette.primary.main,
    textDecoration: 'underline',
    userSelect: 'none',
    cursor: 'pointer',
    display: 'inline-block',
    marginLeft: 10,
  },
  details: {
    marginLeft: 50,
    marginTop: 10,
  },
}))

const LocationHours = ({ location, expandable }) => {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)

  const toggleDetails = useCallback(() => {
    setExpanded(!expanded)
  }, [expanded])

  useEffect(() => {
    setExpanded(false)
  }, [location])

  return (
    <div className={classes.root}>
      <div className={classes.summary}>
        <div className={classes.iconCell}>
          <ClockIcon />
        </div>
        <div className={classes.textCell}>
          <span className={classes.openStatus}>Open now</span>
          <span className={classes.openUntil}>until 9pm</span>
          <span className={classes.timezone}>(PDT)</span>
          {expandable && (
            <span className={classes.toggle} onClick={toggleDetails}>
              { expanded ? 'Hide' : 'More hours' }
            </span>
          )}
        </div>
      </div>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <div className={classes.details}>
          {Array.from({ length: 10 }).map((el, idx) => (
            <div key={idx.toString()}>time (to do)</div>
          ))}
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
