import api from 'services/api'
import queryString from 'query-string'

export const types = {
  SAVE_QUERY: 'SAVE_QUERY',
  GET_JURISDICTION_PENDING: 'GET_JURISDICTION_PENDING',
  GET_JURISDICTION_ERROR: 'GET_JURISDICTION_ERROR',
  GET_JURISDICTION_SUCCESS: 'GET_JURISDICTION_SUCCESS',
  SELECT_LOCATION: 'SELECT_LOCATION',
  HIDE_SELECTED_LOCATION: 'HIDE_SELECTED_LOCATION',
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
  return (dispatch) => {
    dispatch({ type: types.GET_JURISDICTION_PENDING })

    return api.getJurisdiction(jurisdictionId)
      .then(({ state, jurisdiction, locations }) =>
        dispatch({
          type: types.GET_JURISDICTION_SUCCESS,
          data: { state, jurisdiction, locations },
        }))
      .catch(error =>
        dispatch({
          type: types.GET_JURISDICTION_ERROR,
          data: { error },
        }))
  }
}

export const selectLocation = (locationId) => ({
  type: types.SELECT_LOCATION,
  data: { locationId },
})

export const hideSelectedLocation = () => ({
  type: types.HIDE_SELECTED_LOCATION
})

const initialState = {
  query: {
    jurisdictionId: null,
    lngLat: null,
    address: null,
  },
  data: {
    isLoading: true,
    error: null,
    state: null,
    jurisdiction: null,
    locations: null,
  },
  ui: {
    selectedLocationId: null,
    showLocationDetail: false,
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
        ui: {
          ...state.ui,
          showLocationDetail: false,
        },
      }
    case types.GET_JURISDICTION_PENDING:
      return {
        ...state,
        data: {
          ...state.data,
          isLoading: true,
        },
      }
    case types.GET_JURISDICTION_SUCCESS:
      return {
        ...state,
        data: {
          isLoading: false,
          error: null,
          state: action.data.state,
          jurisdiction: action.data.jurisdiction,
          locations: action.data.locations,
        },
        ui: {
          ...state.ui,
          selectedLocationId: null,
        }
      }
    case types.GET_JURISDICTION_ERROR:
      return {
        ...state,
        data: {
          isLoading: false,
          error: action.error,
        },
        ui: {
          ...state.ui,
          selectedLocationId: null,
        }
      }
    case types.SELECT_LOCATION:
      return {
        ...state,
        ui: {
          ...state.ui,
          selectedLocationId: action.data.locationId,
          showLocationDetail: true,
        },
      }
    case types.HIDE_SELECTED_LOCATION:
      return {
        ...state,
        ui: {
          ...state.ui,
          showLocationDetail: false
        }
      }
    default:
      return state
  }
}

export default reducer
