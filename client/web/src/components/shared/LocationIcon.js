import React from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as MapMarker } from 'assets/icons/map-marker-library.svg'

// TODO: switch icon based on facilityTypeId
// need mapping between ids and icons
const LocationIcon = ({ size, fill, facilityTypeId }) => (
  <MapMarker width={size} height={size} fill={fill} />
)

export default LocationIcon

LocationIcon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
  facilityTypeId: PropTypes.number,
}

LocationIcon.defaultProps = {
  size: 50,
  fill: 'black',
  facilityTypeId: null,
}
