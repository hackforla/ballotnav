import React from 'react'
import { connect } from 'react-redux'
import * as select from 'redux/selectors'
import PropTypes from 'prop-types'

const LocationsSummary = ({ numLocations, stateAbbr, jurisdictionName }) => {
  const word = numLocations === 1 ? 'location' : 'locations'
  return (
    <div style={{ fontWeight: 700, fontSize: 16, margin: '8px 0' }}>
      { numLocations } known drop off { word }
      &nbsp;in <b>{ jurisdictionName }, { stateAbbr }</b>
    </div>
  )
}

const mapStateToProps = (state) => ({
  numLocations: select.sortedLocations(state).length,
  stateAbbr: select.state(state).abbreviation,
  jurisdictionName: select.jurisdiction(state).name,
})

export default connect(mapStateToProps)(LocationsSummary)

LocationsSummary.propTypes = {
  numLocations: PropTypes.number.isRequired,
  stateAbbr: PropTypes.string.isRequired,
  jurisdictionName: PropTypes.string.isRequired,
}
