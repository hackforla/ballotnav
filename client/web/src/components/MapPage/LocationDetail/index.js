import React from 'react'
import { connect } from 'react-redux'

const LocationDetail = ({ location }) => {
  if (!location) return null
  return (
    <div>
      { location.name }
    </div>
  )
}

const mapStateToProps = (state) => {
  const { selectedLocationId } = state.ui
  const { locations } = state.data
  return {
    location: selectedLocationId
      ? locations.find(loc => loc.id === selectedLocationId)
      : null
  }
}

export default connect(mapStateToProps)(LocationDetail)
