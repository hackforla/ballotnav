import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '30px 0',
    padding: 25,
    border: '1px #CFD6DF solid',
    borderRadius: 10,
  },
  title: {
    fontWeight: 700,
  },
}))

const LocationRules = ({ location }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.title}>Location Rules</div>
      To do
    </div>
  )
}

export default LocationRules

LocationRules.propTypes = {
  location: PropTypes.shape({}).isRequired,
}
