import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import ClockIcon from '@material-ui/icons/AccessTime'
import Hours from './Hours'
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 8,
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
    flex: 1,
    paddingTop: 1,
    fontSize: 16,
    fontWeight: 400,
  },
}))

const Continuous = ({ location }) => {
  const startDate = moment(location.continuousOpenDate)
  const now = moment()

  const startText = startDate.isSameOrAfter(now)
    ? ` starting ${startDate.format('MM/D/YY')}`
    : ''

  return <span>Open 24/7{startText}</span>
}

const Description = ({ location }) => {
  return <span>{location.scheduleDescription}</span>
}

//fill="#63A275"

const LocationSchedule = ({ location, expandable }) => {
  const classes = useStyles()

  const isClosed = true // TODO: calculate this
  
  return (
    <div className={classes.root}>
      <div className={classes.iconCell}>
        <ClockIcon style={{ color: isClosed ? '#FF0029' : '#63A275' }} />
      </div>
      <div className={classes.textCell}>
        {(() => {
          switch (location.scheduleType) {
            case 'continuous':
              return <Continuous location={location} />
            case 'description':
              return <Description location={location} />
            case 'hours':
              return <Hours location={location} expandable={expandable} />
            default:
              return <span>Unknown</span>
          }
        })()}
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
