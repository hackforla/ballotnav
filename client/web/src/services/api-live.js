import axios from 'axios'
import queryString from 'query-string'

const BASE_URL = process.env.REACT_APP_API_URL

async function getJurisdictions(lon, lat) {
  const query = queryString.stringify({ lon, lat })
  const url = `${BASE_URL}/jurisdictions?${query}`
  const { data } = await axios.get(url)
  return data
}

async function getState(stateId) {
  const url = `${BASE_URL}/states/${stateId}`
  const { data } = await axios.get(url)
  return data
}

async function getJurisdiction(jurisdictionId) {
  const url = `${BASE_URL}/jurisdictions/${jurisdictionId}`
  const {
    data: { locations, ...jurisdiction },
  } = await axios.get(url)
  const state = await getState(jurisdiction.stateId)

  if (jurisdiction.geojson)
    jurisdiction.geojson = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: JSON.parse(jurisdiction.geojson),
        },
      ],
    }

  // fixes issue on prod where geomPoint was returned as a hash instead
  // of an object
  locations.forEach((location) => {
    if (typeof location.geomPoint === 'string')
      location.geomPoint = {
        type: 'Point',
        coordinates: [+location.geomLongitude, +location.geomLatitude],
      }
  })

  return {
    state,
    jurisdiction,
    locations,
  }
}

async function getStatesWithJurisdictions() {
  const url = `${BASE_URL}/states-and-jurisdictions`
  const { data } = await axios.get(url)
  return data
}

const service = {
  getJurisdictions,
  getJurisdiction,
  getStatesWithJurisdictions,
}

export default service
