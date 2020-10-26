import axios from 'axios'
import queryString from 'query-string'

const BASE_URL =
  process.env.REACT_APP_API_URL || 'https://api.dev.ballotnav.org/public'

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
  const { data: jurisdictionData } = await axios.get(url)
  const stateData = await getState(jurisdictionData.stateId)
  return {
    jurisdictionData,
    stateData,
  }
}

export default {
  getJurisdictions,
  getJurisdiction,
}
