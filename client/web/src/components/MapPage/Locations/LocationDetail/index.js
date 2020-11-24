import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as select from 'store/selectors'
import { openModal } from 'store/actions'
import BackButton from './BackButton'
import CheckSteps from './CheckSteps'
import LocationName from '../shared/LocationName'
import LocationAddress from '../shared/LocationAddress'
import LocationHours from '../shared/LocationHours'

const LocationDetail = ({ location, openShareModal }) => {
  if (!location) return null
  return (
    <div>
      <BackButton />
      <CheckSteps />
      <LocationName location={location} />
      <LocationAddress
        location={location}
        onShare={() => openShareModal({ location })}
      />
      <LocationHours location={location} expandable />
    </div>
  )
}

const mapStateToProps = (state) => ({
  location: select.selectedLocation(state),
})

const mapDispatchToProps = (dispatch) => ({
  openShareModal: (params) => dispatch(openModal('share', params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LocationDetail)

LocationDetail.propTypes = {
  location: PropTypes.shape({}),
}

LocationDetail.defaultProps = {
  location: null,
}
