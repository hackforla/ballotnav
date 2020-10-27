import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getJurisdiction } from 'redux/actions/data'
import { useHistory, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useMediaQuery } from 'react-responsive'

import ResultHeader from '../info/ResultHeader'
import Map from './Map'
import CountyInfo from '../info/CountyInfo'
import ResultDetail from '../info/ResultDetail'
import queryString from 'query-string'
import SearchBar from 'components/SearchBar'

const MapContainer = ({ data, getJurisdiction }) => {
  const [countyInfoOpen, setCountyInfoOpen] = useState(false)
  const location = useLocation()
  const history = useHistory()
  const [center, setCenter] = useState(null)
  const [selectedLocation, setSelectedLocation] = useState(null)
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1023px)' })

  useEffect(() => {
    const query = queryString.parse(location.search)
    getJurisdiction(query.jid).then(() =>
      setCenter({
        lng: parseFloat(query.lng),
        lat: parseFloat(query.lat),
      })
    )
  }, [getJurisdiction, location.search])

  const closeCountyInfo = () => {
    setCountyInfoOpen(false)
  }

  const toggleCountyInfo = () => {
    setCountyInfoOpen(!countyInfoOpen)
  }

  const [resultDetailOpen, setResultDetailOpen] = useState(false)

  const closeResultDetail = () => {
    setResultDetailOpen(false)
  }

  const onSelectLocation = (locationId) => {
    const { locations } = data.jurisdictionData
    const location = locations.find((loc) => loc.id === locationId)

    setSelectedLocation(location)
    setResultDetailOpen(true)
  }

  if (!data || !center) return null
  return (
    <div className="map-container">
      <ResultHeader
        stateName={data.stateData.name}
        jurisdictionName={data.jurisdictionData.name}
        toggleCountyInfo={toggleCountyInfo}
      />
      {isTabletOrMobile && <SearchBar center={center} />}
      <Map
        center={center}
        toggleCountyInfo={toggleCountyInfo}
        onSelectLocation={onSelectLocation}
        history={history}
      />
      <CountyInfo open={countyInfoOpen} close={closeCountyInfo} />
      <ResultDetail
        open={resultDetailOpen}
        close={closeResultDetail}
        data={data}
        location={selectedLocation}
      />
    </div>
  )
}

const mapStateToProps = (state) => ({
  data: state.data,
})

const mapDispatchToProps = (dispatch) => ({
  getJurisdiction: (jurisdictionId) =>
    dispatch(getJurisdiction(jurisdictionId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer)

MapContainer.propTypes = {
  data: PropTypes.object,
}
