import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getJurisdiction } from 'redux/actions/data'
import { useHistory, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import ResultHeader from '../info/ResultHeader'
import Map from './Map'
import CountyInfo from '../info/CountyInfo'
import ResultDetail from '../info/ResultDetail'
import queryString from 'query-string'

const MapContainer = ({ data, getJurisdiction }) => {
  const [countyInfoOpen, setCountyInfoOpen] = useState(false)
  const location = useLocation()
  const history = useHistory()
  const [center, setCenter] = useState(null)
  const [selectedLocation, setSelectedLocation] = useState(null)

  useEffect(() => {
    const query = queryString.parse(location.search)
    getJurisdiction(query.jid).then(() => setCenter([query.lon, query.lat]))
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
    <>
      <ResultHeader
        stateName={data.stateData.name}
        jurisdictionName={data.jurisdictionData.name}
        toggleCountyInfo={toggleCountyInfo}
      />
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
    </>
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
