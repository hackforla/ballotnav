import React from 'react'
import { connect } from 'react-redux'
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
  numLocations: state.data.locations.length,
  stateAbbr: state.data.state.abbreviation,
  jurisdictionName: state.data.jurisdiction.name,
})

export default connect(mapStateToProps)(LocationsSummary)

LocationsSummary.propTypes = {
  numLocations: PropTypes.number.isRequired,
  stateAbbr: PropTypes.string.isRequired,
  jurisdictionName: PropTypes.string.isRequired,
}
