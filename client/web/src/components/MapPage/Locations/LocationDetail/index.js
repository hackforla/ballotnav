import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as select from 'store/selectors'
import BackButton from './BackButton'
import CheckSteps from './CheckSteps'
import LocationName from '../shared/LocationName'

const LocationDetail = ({ location }) => {
  if (!location) return null
  return (
    <div>
      <BackButton />
      <CheckSteps />
      <LocationName location={location} />
    </div>
  )
}

const mapStateToProps = (state) => ({
  location: select.selectedLocation(state),
})

export default connect(mapStateToProps)(LocationDetail)

LocationDetail.propTypes = {
  location: PropTypes.shape({}),
}

LocationDetail.defaultProps = {
  location: null,
}
