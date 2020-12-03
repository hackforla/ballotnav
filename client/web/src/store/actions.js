import api from 'services/api'
import queryString from 'query-string'

export const types = {
  SAVE_QUERY: 'SAVE_QUERY',
  GET_JURISDICTION_PENDING: 'GET_JURISDICTION_PENDING',
  GET_JURISDICTION_ERROR: 'GET_JURISDICTION_ERROR',
  GET_JURISDICTION_SUCCESS: 'GET_JURISDICTION_SUCCESS',
  GET_STATES_WITH_JURISDICTIONS_SUCCESS:
    'GET_STATES_WITH_JURISDICTIONS_SUCCESS',
  GET_STATES_WITH_JURISDICTIONS_ERROR: 'GET_STATES_WITH_JURISDICTIONS_ERROR',
  SELECT_LOCATION: 'SELECT_LOCATION',
  OPEN_MODAL: 'OPEN_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL',
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
    },
  }
}

export const getJurisdiction = (jurisdictionId) => {
  return (dispatch) => {
    dispatch({ type: types.GET_JURISDICTION_PENDING })

    return api
      .getJurisdiction(jurisdictionId)
      .then(({ state, jurisdiction, locations }) =>
        dispatch({
          type: types.GET_JURISDICTION_SUCCESS,
          data: { state, jurisdiction, locations },
        })
      )
      .catch((error) =>
        dispatch({
          type: types.GET_JURISDICTION_ERROR,
          data: { error },
        })
      )
  }
}

export const getStatesWithJurisdictions = () => {
  return (dispatch) =>
    api
      .getStatesWithJurisdictions()
      .then((data) =>
        dispatch({
          type: types.GET_STATES_WITH_JURISDICTIONS_SUCCESS,
          data,
        })
      )
      .catch((error) =>
        dispatch({
          type: types.GET_STATES_WITH_JURISDICTIONS_ERROR,
          data: { error },
        })
      )
}

export const selectLocation = (locationId) => ({
  type: types.SELECT_LOCATION,
  data: { locationId },
})

export const openModal = (modalId, params) => ({
  type: types.OPEN_MODAL,
  data: { modalId, params },
})

export const closeModal = (modalId) => ({
  type: types.CLOSE_MODAL,
  data: { modalId },
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
    statesWithJurisdictions: null,
  },
  ui: {
    selectedLocationId: null,
  },
  modals: {
    search: {
      isOpen: false,
      params: {},
    },
    share: {
      isOpen: false,
      params: {},
    },
    voteDotOrg: {
      isOpen: false,
      params: {},
    },
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
          selectedLocationId: null,
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
          ...state.data,
          isLoading: false,
          error: null,
          state: action.data.state,
          jurisdiction: action.data.jurisdiction,
          locations: action.data.locations,
        },
      }
    case types.GET_JURISDICTION_ERROR:
      return {
        ...state,
        data: {
          isLoading: false,
          error: action.data.error,
        },
        ui: {
          ...state.ui,
          selectedLocationId: null,
        },
      }
    case types.GET_STATES_WITH_JURISDICTIONS_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          statesWithJurisdictions: action.data,
        },
      }
    case types.GET_STATES_WITH_JURISDICTIONS_ERROR:
      return {
        ...state,
        data: {
          ...state.data,
          error: action.data.error,
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
    case types.OPEN_MODAL:
      return {
        ...state,
        modals: {
          ...state.modals,
          [action.data.modalId]: {
            isOpen: true,
            params: action.data.params,
          },
        },
      }
    case types.CLOSE_MODAL:
      return {
        ...state,
        modals: {
          ...state.modals,
          [action.data.modalId]: {
            isOpen: false,
            params: {},
          },
        },
      }
    default:
      return state
  }
}

export default reducer
