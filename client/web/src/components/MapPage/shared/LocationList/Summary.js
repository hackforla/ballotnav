import React from 'react'
import { connect } from 'react-redux'
import * as select from 'store/selectors'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
  },
  count: {
    fontWeight: 700,
    fontSize: 16,
  },
  instructions: {
    fontWeight: 400,
    fontStyle: 'italic',
    fontSize: 14,
  },
}))

const Summary = ({ numLocations, stateAbbr, jurisdictionName }) => {
  const classes = useStyles()
  const word = numLocations === 1 ? 'location' : 'locations'
  return (
    <div className={classes.root}>
      <div className={classes.count}>
        {numLocations} known drop off {word}
        &nbsp;in{' '}
        <b>
          {jurisdictionName}, {stateAbbr}
        </b>
      </div>
      {/*<div className={classes.instructions}>
        Select a location to view rules, hours and directions
      </div>*/}
    </div>
  )
}

const mapStateToProps = (state) => ({
  numLocations: select.sortedLocations(state).length,
  stateAbbr: select.state(state).abbreviation,
  jurisdictionName: select.jurisdiction(state).name,
})

export default connect(mapStateToProps)(Summary)

Summary.propTypes = {
  numLocations: PropTypes.number.isRequired,
  stateAbbr: PropTypes.string.isRequired,
  jurisdictionName: PropTypes.string.isRequired,
}
