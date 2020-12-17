import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { ReactComponent as PinIcon } from 'assets/icons/pin.svg'
import InfoIcon from '@material-ui/icons/Info'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 12,
    marginLeft: -10,
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
    fontWeight: 400,
    fontStyle: 'italic',
  },
}))

const DisplayNote = ({ location }) => {
  const classes = useStyles()

  if (!location.displayNote) return null
  return (
    <div className={classes.root}>
      <div className={classes.iconCell}>
        <InfoIcon color='primary' />
      </div>
      <div className={classes.textCell}>
        { location.displayNote }
      </div>
    </div>
  )
}

export default DisplayNote

DisplayNote.propTypes = {
  location: PropTypes.shape({}).isRequired,
  showDistanceDetails: PropTypes.bool,
}

DisplayNote.defaultProps = {
  showDistanceDetails: false,
}
