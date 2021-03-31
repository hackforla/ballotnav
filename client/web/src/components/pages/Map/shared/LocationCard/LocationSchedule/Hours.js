import React, { useState, useEffect, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Collapse from '@material-ui/core/Collapse'
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  today: {
    '& b': {
      display: 'inline-block',
      marginRight: 14,
      fontWeight: 400,
    },
  },
  table: {
    marginTop: 10,
    '& td, th': {
      padding: '2px 0',
    },
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
  const classes = useStyles()
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    setShowDetails(false)
  }, [location])

  const toggle = useCallback(() => {
    setShowDetails(!showDetails)
  }, [showDetails])

  const hours = useMemo(() => {
    return location.hours
      .map((hour) => ({
        beginDate: moment(hour.beginDate),
        endDate: moment(hour.endDate),
        openTime: formatTime(hour.openTime),
        closeTime: formatTime(hour.closeTime),
      }))
      .sort((a, b) => (b.beginDate.isBefore(a.beginDate) ? 1 : -1))
  }, [location])

  const today = useMemo(() => {
    const now = moment()
    return hours.find(
      (hour) =>
        hour.beginDate.isSameOrBefore(now) &&
        hour.endDate.clone().endOf('day').isSameOrAfter(now)
    )
  }, [hours])

  return (
    <>
      <div className={classes.today}>
        {today ? (
          <span>
            <b>Open Today</b>
            {today.openTime} - {today.closeTime}
          </span>
        ) : (
          <span>Closed Today</span>
        )}
        {expandable && (
          <span className={classes.toggle} onClick={toggle}>
            {showDetails ? 'less' : 'more'}
          </span>
        )}
      </div>
      <Collapse in={showDetails} timeout="auto" unmountOnExit>
        <table className={classes.table}>
          <thead>
            <tr>
              <th>Date(s)</th>
              <th style={{ paddingLeft: 30 }}>Hours</th>
            </tr>
          </thead>
          <tbody>
            {hours.map((hour) => {
              const dateString = hour.beginDate.isSame(hour.endDate)
                ? hour.beginDate.format('M/DD')
                : `${hour.beginDate.format('M/DD')} - ${hour.endDate.format(
                    'M/DD'
                  )}`
              return (
                <tr key={hour.beginDate.format('M/DD')}>
                  <td>{dateString}</td>
                  <td style={{ paddingLeft: 30 }}>
                    {hour.openTime} - {hour.closeTime}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Collapse>
    </>
  )
}

export default Hours

Hours.propTypes = {
  location: PropTypes.shape({}).isRequired,
  expandable: PropTypes.bool,
}

Hours.defaultProps = {
  expandable: false,
}
