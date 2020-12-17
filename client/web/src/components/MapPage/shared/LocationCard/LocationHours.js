import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import InfoIcon from '@material-ui/icons/Info'
import { ReactComponent as ClockIcon } from 'assets/icons/clock.svg'
import Collapse from '@material-ui/core/Collapse'
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

const useHoursStyles = makeStyles((theme) => ({
  today: {
    marginTop: 1,
    '& b': {
      display: 'inline-block',
      marginRight: 8,
    }
  },
  table: {
    marginTop: 10,
    '& td, th': {
      padding: '2px 0',
    }
  },
  toggle: {
    color: theme.palette.primary.main,
    textDecoration: 'underline',
    userSelect: 'none',
    cursor: 'pointer',
    display: 'inline-block',
    marginLeft: 16,
  },
}))

function formatTime(time) {
  let [hours, minutes] = time.split(':')
  hours = +hours
  const isPm = hours >= 12
  hours = (hours > 12 ? hours - 12 : hours).toString()
  hours = hours.replace(/^0/, '')
  return `${hours}:${minutes}${isPm ? 'p' : 'a'}`
}

const Hours = ({ location, expandable }) => {
  const classes = useHoursStyles()
  const [showDetails, setShowDetails] = useState(false)

  const hours = location.hours.map((hour) => ({
    beginDate: moment(hour.beginDate),
    endDate: moment(hour.endDate),
    openTime: formatTime(hour.openTime),
    closeTime: formatTime(hour.closeTime),
  }))

  hours.sort((a, b) => b.beginDate.isBefore(a.beginDate) ? 1 : -1)

  const now = moment()
  const today = hours.find((hour) => {
    return hour.beginDate.isSameOrBefore(now) && hour.endDate.isSameOrAfter(now)
  })

  return (
    <>
      <div className={classes.today}>
        {
          today ? (
            <span>
              <b>Open Today</b>
              &nbsp;&nbsp;&nbsp;&nbsp;
              {today.openTime} - {today.closeTime}
            </span>
          ) : (
            <span>Closed Today</span>
          )
        }
        {expandable && (
          <span className={classes.toggle} onClick={() => setShowDetails(!showDetails)}>
            { showDetails ? 'less' : 'more' }
          </span>
        )}
      </div>
      <Collapse in={showDetails} timeout="auto" unmountOnExit>
        <table className={classes.table}>
          <thead>
            <tr>
              <th>Date Range</th>
              <th style={{ paddingLeft: 30 }}>Hours</th>
            </tr>
          </thead>
          <tbody>
            {hours.map((hour) => (
              <tr>
                <td>
                  {hour.beginDate.format('M/DD')} -
                  {hour.endDate.format('M/DD')}
                </td>
                <td style={{ paddingLeft: 30}}>
                  {hour.openTime} - {hour.closeTime}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Collapse>
      {showDetails && false && (
        <table className={classes.root}>
          <thead>
            <tr>
              <th>Date Range</th>
              <th style={{ paddingLeft: 30 }}>Hours</th>
            </tr>
          </thead>
          <tbody>
            {hours.map((hour) => (
              <tr>
                <td>
                  {hour.beginDate.format('M/DD')} -
                  {hour.endDate.format('M/DD')}
                </td>
                <td style={{ paddingLeft: 30}}>
                  {hour.openTime} - {hour.closeTime}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

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
          {(() => {
            switch(location.scheduleType) {
              case 'continuous': return <Continuous location={location} />
              case 'description': return <Description location={location} />
              case 'hours': return <Hours location={location} expandable={expandable} />
            }
          })()}
        </div>
      </div>
      {/*<Collapse in={expanded} timeout="auto" unmountOnExit>
        <div className={classes.details}>
          {Array.from({ length: 10 }).map((el, idx) => (
            <div key={idx.toString()}>time (to do)</div>
          ))}
        </div>
      </Collapse>*/}
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
