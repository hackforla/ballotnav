import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as select from 'store/selectors'
import BackButton from './BackButton'
import CheckSteps from './CheckSteps'
import LocationName from '../shared/LocationName'
import LocationAddress from '../shared/LocationAddress'
import LocationHours from '../shared/LocationHours'

const LocationDetail = ({ location }) => {
  if (!location) return null
  return (
    <div>
      <BackButton />
      <CheckSteps />
      <LocationName location={location} />
      <LocationAddress
        location={location}
        onShare={() => console.log('sharing:', location)}
      />
      <LocationHours location={location} expandable />
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
