import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as select from 'store/selectors'
import VerifyBox from './VerifyBox'
import DirectionsButton from './DirectionsButton'
import ShareButton from './ShareButton'
// import LocationRules from './LocationRules'
import LocationCard from '../LocationCard'
import Divider from '@material-ui/core/Divider'
import DisplayNote from './DisplayNote'

const LocationDetail = ({
  location,
  jurisdiction,
  userLocation,
  userAddress,
}) => {
  if (!location) return null
  return (
    <>
      <LocationCard location={location} isSelected hoursExpandable />
      <DisplayNote location={location} />
      <Divider style={{ margin: '20px 0 10px' }} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <ShareButton location={location} />
        <DirectionsButton
          userLocation={userLocation}
          userAddress={userAddress}
          location={location}
        />
      </div>
      <Divider style={{ margin: '10px 0 20px' }} />
      <VerifyBox location={location} jurisdiction={jurisdiction} />
      {/*<LocationRules location={location} />*/}
    </>
  )
}

const mapStateToProps = (state) => ({
  jurisdiction: select.jurisdiction(state),
  userLocation: select.userLocation(state),
  userAddress: select.userAddress(state),
})

export default connect(mapStateToProps)(LocationDetail)

LocationDetail.propTypes = {
  location: PropTypes.shape({}),
  userLocation: PropTypes.shape({}),
  userAddress: PropTypes.string,
}

LocationDetail.defaultProps = {
  location: null,
  userLocation: undefined,
  userAddress: undefined,
}
