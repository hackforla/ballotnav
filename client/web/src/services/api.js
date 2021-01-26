// this mocks the real api (see api-live.js) and returns GA
// data from the json files in ./data

import jurisdictions from './data/jurisdictions.json'
import statesAndJurisdictions from './data/statesAndJurisdictions.json'
import pointInPolygon from '@turf/boolean-point-in-polygon'

async function getJurisdictions(lon, lat) {
  const jurisdiction = jurisdictions.find((j) => {
    const { geojson } = j.jurisdiction
    if (!geojson) return false
    return pointInPolygon([lon, lat], geojson.features[0])
  })

  return jurisdiction ? [{ id: jurisdiction.jurisdiction.id }] : []
}

async function getJurisdiction(jurisdictionId) {
  return jurisdictions.find((j) => j.jurisdiction.id === jurisdictionId)
}

async function getStatesWithJurisdictions() {
  return statesAndJurisdictions
}

const service = {
  getJurisdictions,
  getJurisdiction,
  getStatesWithJurisdictions,
}

export default service
