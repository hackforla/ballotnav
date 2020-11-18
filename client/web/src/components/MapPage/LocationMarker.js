import React from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as MapMarker } from 'assets/icons/map-marker-library.svg'

const LocationMarker = ({ size, fill }) => (
  <MapMarker width={size} height={size} fill={fill} />
)

export default LocationMarker

LocationMarker.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
}

LocationMarker.defaultProps = {
  size: 30,
  fill: 'black',
}
