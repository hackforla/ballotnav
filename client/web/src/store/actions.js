import history from 'services/history'
import api from 'services/api'
import mixpanel from 'services/mixpanel'
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

export const getJurisdiction = (jurisdictionId) => {
  return (dispatch) => {
    // start timer
    mixpanel.time_event(types.GET_JURISDICTION_SUCCESS)
    dispatch({ type: types.GET_JURISDICTION_PENDING })

    return api
      .getJurisdiction(jurisdictionId)
      .then(({ state, jurisdiction, locations }) => {
        const data = { state, jurisdiction, locations }
        // end timer and log data
        mixpanel.track(types.GET_JURISDICTION_SUCCESS, data)
        dispatch({
          type: types.GET_JURISDICTION_SUCCESS,
          data,
        })
      })
      .catch((error) => {
        mixpanel.track(types.GET_JURISDICTION_ERROR, { error })
        dispatch({
          type: types.GET_JURISDICTION_ERROR,
          data: { error },
        })
      })
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
    locationId: null,
    lngLat: null,
    address: null,
  },
  data: {
    isLoaded: false,
    isLoading: false,
    error: null,
    state: null,
    jurisdiction: null,
    locations: null,
    statesWithJurisdictions: null,
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
          locationId: action.data.locationId,
          lngLat: action.data.lngLat,
          address: action.data.address,
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
          isLoaded: true,
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
          isLoaded: true,
          error: action.data.error,
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
        modals: {
          ...state.modals,
          [action.data.modalId]: {
            isOpen: true,
            params: action.data.params,
          },
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
