import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { openModal } from 'store/actions'
import { useHistory } from 'react-router-dom'
import queryString from 'query-string'
import api from 'services/api'
import Geocoder from './Geocoder'
import SearchButton from './SearchButton'
import UseMyLocation from './UseMyLocation'

function SearchBar({ center, address, onComplete, useModal, openSearchModal }) {
  const history = useHistory()

  const handleResult = useCallback(
    async ({ lng, lat, address }) => {
      const jurisdictions = await api.getJurisdictions(lng, lat)

      const jid = jurisdictions[0]?.id
      history.push({
        pathname: '/map',
        search: queryString.stringify({ jid, lng, lat, address }),
      })

      if (onComplete) onComplete()
    },
    [history, onComplete]
  )

  return (
    <div>
      {useModal ? (
        <SearchButton onClick={openSearchModal} />
      ) : (
        <Geocoder center={center} address={address} onResult={handleResult} />
      )}
      <UseMyLocation onResult={handleResult} />
    </div>
  )
}

const mapStateToProps = (state) => ({
  center: state.query.lngLat,
  address: state.query.address,
})

const mapDispatchToProps = (dispatch) => ({
  openSearchModal: () => dispatch(openModal('search')),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)

SearchBar.propTypes = {
  center: PropTypes.shape({
    lng: PropTypes.number,
    lat: PropTypes.number,
  }),
  address: PropTypes.string,
  useModal: PropTypes.bool,
  openSearchModal: PropTypes.func.isRequired,
}

SearchBar.defaultProps = {
  center: null,
  address: null,
  useModal: false,
}
