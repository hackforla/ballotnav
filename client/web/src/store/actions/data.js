import api from 'services/api'
import mixpanel from 'services/mixpanel'

export const types = {
  GET_JURISDICTION_PENDING: 'GET_JURISDICTION_PENDING',
  GET_JURISDICTION_ERROR: 'GET_JURISDICTION_ERROR',
  GET_JURISDICTION_SUCCESS: 'GET_JURISDICTION_SUCCESS',
  GET_STATES_WITH_JURISDICTIONS_SUCCESS:
    'GET_STATES_WITH_JURISDICTIONS_SUCCESS',
  GET_STATES_WITH_JURISDICTIONS_ERROR: 'GET_STATES_WITH_JURISDICTIONS_ERROR',
}

export const getJurisdiction = (jurisdictionId) => {
  return (dispatch) => {
    if (!jurisdictionId)
      return dispatch({
        type: types.GET_JURISDICTION_SUCCESS,
        data: {
          state: null,
          jurisdiction: null,
          locations: null,
        },
      })

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

const initialState = {
  isLoading: false,
  error: null,
  state: null,
  jurisdiction: null,
  locations: null,
  statesWithJurisdictions: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_JURISDICTION_PENDING:
      return {
        ...state,
        isLoading: true,
      }
    case types.GET_JURISDICTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        state: action.data.state,
        jurisdiction: action.data.jurisdiction,
        locations: action.data.locations,
      }
    case types.GET_JURISDICTION_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.data.error,
      }
    case types.GET_STATES_WITH_JURISDICTIONS_SUCCESS:
      return {
        ...state,
        statesWithJurisdictions: action.data,
      }
    case types.GET_STATES_WITH_JURISDICTIONS_ERROR:
      return {
        ...state.data,
        error: action.data.error,
      }
    default:
      return state
  }
}

export default reducer
