import React from 'react'
import { connect } from 'react-redux'
import * as select from 'store/selectors'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
  },
  text: {
    fontWeight: 700,
    fontSize: 16,
    '& p': {
      marginBottom: 20,
    },
  },
  instructions: {
    fontWeight: 400,
    fontStyle: 'italic',
    fontSize: 14,
  },
}))

const Summary = ({ numLocations, stateAbbr, jurisdictionName }) => {
  const classes = useStyles()
  if (!jurisdictionName) {
    return (
      <div className={classes.root}>
        <div className={classes.text}>
          <p>
            There are currently no ballot drop-off locations being displayed
            as BallotNav is working on validating information for future
            elections.
          </p>
          <p>
            Please check back in with us later, or see how you
            can help on our Volunteer Page.
          </p>
        </div>
      </div>
    )
  }

  const word = numLocations === 1 ? 'location' : 'locations'
  return (
    <div className={classes.root}>
      <div className={classes.text}>
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
  stateAbbr: select.state(state)?.abbreviation,
  jurisdictionName: select.jurisdiction(state)?.name,
})

export default connect(mapStateToProps)(Summary)

Summary.propTypes = {
  numLocations: PropTypes.number.isRequired,
  stateAbbr: PropTypes.string,
  jurisdictionName: PropTypes.string,
}

Summary.defaultProps = {
  stateAbbr: undefined,
  jurisdictionName: undefined,
}
