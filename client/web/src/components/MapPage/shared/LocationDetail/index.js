import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as select from 'store/selectors'
import VerifyBox from './VerifyBox'
import DirectionsButton from './DirectionsButton'
import ShareButton from './ShareButton'
import LocationRules from './LocationRules'
import LocationCard from '../LocationCard'
import Divider from '@material-ui/core/Divider'

const LocationDetail = ({ location, origin }) => {
  if (!location) return null
  return (
    <>
      <LocationCard location={location} hoursExpandable />
      <Divider style={{ margin: '16px 0' }} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <ShareButton location={location} />
        <DirectionsButton origin={origin} location={location} />
      </div>
      <Divider style={{ margin: '16px 0' }} />
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
