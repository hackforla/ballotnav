import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import queryString from 'query-string'
import api from 'services/api'
import Geocoder from './Geocoder'

function SearchBar({ center }) {
  const history = useHistory()

  const handleLngLat = useCallback(
    async ({ lng, lat }) => {
      const jurisdictions = await api.getJurisdictions(lng, lat)

      if (jurisdictions.length !== 1) return history.push('/error')

      const { id: jid } = jurisdictions[0]
      const query = queryString.stringify({ jid, lng, lat })
      history.push(`/map?${query}`)
    },
    [history]
  )

  return (
    <div className="search-bar">
      <Geocoder center={center} onResult={handleLngLat} />
    </div>
  )
}

export default SearchBar

SearchBar.propTypes = {
  center: PropTypes.shape({
    lng: PropTypes.number,
    lat: PropTypes.number,
  }),
}

SearchBar.defaultProps = {
  center: null,
}
