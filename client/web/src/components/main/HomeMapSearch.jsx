import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { addSearch } from '../../redux/actions/search.js'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import mapboxgl from 'services/mapbox'
import queryString from 'query-string'
import api from 'services/api'

class HomeMapSearch extends React.Component {
  componentDidMount() {
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      countries: 'us',
      types: 'address, neighborhood, locality, place, district, postcode',
    })

    geocoder.addTo('#geocoder')
    geocoder.setPlaceholder('Enter an address or ZIP')
    geocoder.on('result', this.handleGeocodeResult)
  }

  handleGeocodeResult = async ({ result }) => {
    const { history } = this.props
    const [lon, lat] = result.center
    const jurisdictions = await api.getJurisdictions(lon, lat)

    if (jurisdictions.length === 1) {
      const { id: jid } = jurisdictions[0]
      const query = queryString.stringify({ jid, lon, lat })
      history.push(`/map?${query}`)
    } else {
      history.push('/error') // TODO: figure out what route to go to
    }
  }

  render() {
    return <div id="geocoder" />
  }
}

const mapDispatchToProps = (dispatch) => ({
  addSearch: (search) => dispatch(addSearch(search)),
})

export default withRouter(connect(null, mapDispatchToProps)(HomeMapSearch))

HomeMapSearch.propTypes = {
  addSearch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
}
