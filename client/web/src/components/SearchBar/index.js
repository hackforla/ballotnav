import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import queryString from 'query-string'
import api from 'services/api'
import Geocoder from './Geocoder'

function SearchBar({ center, address }) {
  const history = useHistory()

  const handleLngLat = useCallback(
    async ({ lng, lat, address }) => {
      const jurisdictions = await api.getJurisdictions(lng, lat)

      if (jurisdictions.length !== 1) return history.push('/error')

      const { id: jid } = jurisdictions[0]
      const query = queryString.stringify({ jid, lng, lat, address })
      history.push(`/map?${query}`)
    },
    [history]
  )

  return (
    <div className="search-bar">
      <Geocoder
        center={center}
        address={address}
        onResult={handleLngLat}
      />
    </div>
  )
}

const mapStateToProps = (state) => ({
  center: state.query.lngLat,
  address: state.query.address,
})

export default connect(mapStateToProps)(SearchBar)

SearchBar.propTypes = {
  center: PropTypes.shape({
    lng: PropTypes.number,
    lat: PropTypes.number,
  }),
}

SearchBar.defaultProps = {
  center: null,
}
