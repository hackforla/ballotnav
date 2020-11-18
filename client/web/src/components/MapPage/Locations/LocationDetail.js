import React from 'react'

const LocationDetail = ({ location, closeDetail }) => {
  return (
    <div>
      <div onClick={closeDetail}>Close</div>
      { location.name }
    </div>
  )
}

export default LocationDetail
