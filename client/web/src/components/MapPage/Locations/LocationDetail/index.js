import React from 'react'
import { connect } from 'react-redux'
import CheckSteps from './CheckSteps'

const LocationDetail = ({ location }) => {
  if (!location) return null
  return (
    <div>
      <CheckSteps />
      <div>{ location.name }</div>
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
