import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as select from 'store/selectors'
import { openModal } from 'store/actions'
import LocationName from '../shared/LocationName'
import LocationAddress from '../shared/LocationAddress'
import LocationHours from '../shared/LocationHours'
import VerifyBox from './VerifyBox'
import DirectionsButton from './DirectionsButton'
import LocationRules from './LocationRules'

const LocationDetail = ({ location, origin, openShareModal }) => {
  if (!location) return null
  return (
    <div style={{ paddingTop: 10 }}>
      <LocationName location={location} />
      <LocationAddress
        location={location}
        onShare={() => openShareModal({ location })}
      />
      <LocationHours location={location} expandable />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 30,
        }}
      >
        <VerifyBox />
        <DirectionsButton origin={origin} location={location} />
      </div>
      <LocationRules location={location} />
    </div>
  )
}

const mapStateToProps = (state) => ({
  origin: select.query(state).lngLat,
})

const mapDispatchToProps = (dispatch) => ({
  openShareModal: (params) => dispatch(openModal('share', params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LocationDetail)

LocationDetail.propTypes = {
  location: PropTypes.shape({}),
  origin: PropTypes.shape({}),
}

LocationDetail.defaultProps = {
  location: null,
  origin: null,
}
