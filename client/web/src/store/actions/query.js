import history from 'services/history'
import mixpanel from 'services/mixpanel'
import queryString from 'query-string'

export const types = {
  SAVE_QUERY: 'SAVE_QUERY',
  SELECT_LOCATION: 'SELECT_LOCATION',
}

export const saveQuery = () => {
  const { search: query } = history.location
  let { jid, lid, lng, lat, address } = queryString.parse(query)
  jid = parseInt(jid)
  lid = parseInt(lid)
  lng = parseFloat(lng)
  lat = parseFloat(lat)
  const data = {
    jurisdictionId: jid || null,
    locationId: lid || null,
    lngLat: lng && lat ? { lng, lat } : null,
    address: address || null,
  }
  mixpanel.track(types.SAVE_QUERY, data)
  return {
    type: types.SAVE_QUERY,
    data,
  }
}

export const selectLocation = (locationId) => {
  const query = queryString.parse(history.location.search)
  query.lid = locationId || undefined
  history.push(`/map?${queryString.stringify(query)}`)
  mixpanel.track(types.SELECT_LOCATION, { locationId })
  return {
    type: types.SELECT_LOCATION,
    data: { locationId },
  }
}

const initialState = {
  jurisdictionId: null,
  locationId: null,
  lngLat: null,
  address: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_QUERY:
      return {
        jurisdictionId: action.data.jurisdictionId,
        locationId: action.data.locationId,
        lngLat: action.data.lngLat,
        address: action.data.address,
      }
    default:
      return state
  }
}

export default reducer
