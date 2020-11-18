import api from 'services/api'
import queryString from 'query-string'

export const types = {
  SAVE_QUERY: 'SAVE_QUERY',
  GET_JURISDICTION_SUCCESS: 'GET_JURISDICTION_SUCCESS',
  SELECT_LOCATION: 'SELECT_LOCATION',
}

export const saveQuery = (urlQueryString) => {
  let { jid, lng, lat, address } = queryString.parse(urlQueryString)
  jid = parseInt(jid)
  lng = parseFloat(lng)
  lat = parseFloat(lat)
  return {
    type: types.SAVE_QUERY,
    data: {
      jurisdictionId: jid || null,
      lngLat: lng && lat ? { lng, lat } : null,
      address: address || null,
    }
  }
}

export const getJurisdiction = (jurisdictionId) => {
  return async (dispatch) => {
    const {
      state,
      jurisdiction,
      locations,
    } = await api.getJurisdiction(jurisdictionId)

    return dispatch({
      type: types.GET_JURISDICTION_SUCCESS,
      data: { state, jurisdiction, locations },
    })
  }
}

export const selectLocation = (locationId) => ({
  type: types.SELECT_LOCATION,
  data: { locationId },
})

const initialState = {
  query: {
    jurisdictionId: null,
    lngLat: null,
    address: null,
  },
  data: null,
  ui: {
    selectedLocationId: null,
  },
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_QUERY:
      return {
        ...state,
        query: {
          jurisdictionId: action.data.jurisdictionId,
          lngLat: action.data.lngLat,
          address: action.data.address,
        },
      }
    case types.GET_JURISDICTION_SUCCESS:
      return {
        ...state,
        data: {
          state: action.data.state,
          jurisdiction: action.data.jurisdiction,
          locations: action.data.locations,
        },
      }
    case types.SELECT_LOCATION:
      return {
        ...state,
        ui: {
          ...state.ui,
          selectedLocationId: action.data.locationId,
        },
      }
    default:
      return state
  }
}

export default reducer
