import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { ReactComponent as ClockIcon } from 'assets/icons/clock.svg'
import Hours from './Hours'
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 8,
  },
  summary: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  iconCell: {
    width: 50,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCell: {
    paddingTop: 1,
    fontSize: 16,
    fontWeight: 400,
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
  toggle: {
    color: theme.palette.primary.main,
    textDecoration: 'underline',
    userSelect: 'none',
    cursor: 'pointer',
    display: 'inline-block',
    marginLeft: 16,
  },
  details: {
    marginLeft: 50,
    marginTop: 10,
  },
  info: {

  }
}))

const Continuous = ({ location }) => {
  const startDate = moment(location.continuousOpenDate)
  const now = moment()

  const startText = startDate.isSameOrAfter(now)
    ? ` starting ${startDate.format('MM/D/YY')}`
    : ''

  return (
    <span>Open 24/7{startText}</span>
  )
}

const Description = ({ location }) => {
  return (
    <span>{location.scheduleDescription}</span>
  )
}

const LocationSchedule = ({ location, expandable }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.summary}>
        <div className={classes.iconCell}>
          <ClockIcon />
        </div>
        <div className={classes.textCell}>
          {(() => {
            switch(location.scheduleType) {
              case 'continuous': return <Continuous location={location} />
              case 'description': return <Description location={location} />
              case 'hours': return <Hours location={location} expandable={expandable} />
            }
          })()}
        </div>
      </div>
    </div>
  )
}

export default LocationSchedule

LocationSchedule.propTypes = {
  location: PropTypes.shape({}).isRequired,
  expandable: PropTypes.bool,
}

LocationSchedule.defaultProps = {
  expandable: false,
}
