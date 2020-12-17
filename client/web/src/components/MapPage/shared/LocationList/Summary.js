import React from 'react'
import { connect } from 'react-redux'
import * as select from 'store/selectors'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import useBreakpoints from 'hooks/useBreakpoints'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
  },
  text: {
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
  const { isMobile } = useBreakpoints()
  if (!jurisdictionName) {
    return (
      <div className={classes.root}>
        {isMobile ? (
          <div className={classes.text}>
            We could not identify your jurisdiction. Please use the search
            button above to enter your address or jurisdiction.
          </div>
        ) : (
          <div className={classes.text}>
            We could not identify your jurisdiction. Please enter your address
            or use the dropdown above.
          </div>
        )}
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
