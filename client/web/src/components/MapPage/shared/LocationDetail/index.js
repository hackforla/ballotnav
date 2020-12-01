import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as select from 'store/selectors'
import VerifyBox from './VerifyBox'
import DirectionsButton from './DirectionsButton'
import ShareButton from './ShareButton'
import LocationRules from './LocationRules'
import LocationCard from '../LocationCard'

const LocationDetail = ({ location, origin }) => {
  if (!location) return null
  return (
    <>
      <LocationCard location={location} hoursExpandable />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          margin: '20px 0',
        }}
      >
        <ShareButton location={location} />
        <DirectionsButton origin={origin} location={location} />
      </div>
      <VerifyBox />
      <LocationRules location={location} />
    </>
  )
}

const mapStateToProps = (state) => ({
  origin: select.query(state).lngLat,
})

export default connect(mapStateToProps)(LocationDetail)

LocationDetail.propTypes = {
  location: PropTypes.shape({}),
  origin: PropTypes.shape({}),
}

LocationDetail.defaultProps = {
  location: null,
  origin: null,
}
