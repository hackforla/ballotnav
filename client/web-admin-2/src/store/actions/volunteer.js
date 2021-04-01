import api from 'services/api'

export const types = {
  GET_MY_JURISDICTIONS_SUCCESS: 'volunteer/GET_MY_JURISDICTIONS_SUCCESS',
  OPEN_JURISDICTION_TAB: 'volunteer/OPEN_JURISDICTION_TAB',
  CLOSE_JURISDICTION_TAB: 'volunteer/CLOSE_JURISDICTION_TAB',
}

export const getMyJurisdictions = () => {
  return async (dispatch, getState) => {
    const data = await api.assignment.listMyJurisdictions()

    dispatch({
      type: types.GET_MY_JURISDICTIONS_SUCCESS,
      data,
    })
  }
}

export const openJurisdictionTab = (jid) => ({
  type: types.OPEN_JURISDICTION_TAB,
  data: jid,
})

export const closeJurisdictionTab = (jid) => ({
  type: types.CLOSE_JURISDICTION_TAB,
  data: jid,
})

const initialState = {
  myJurisdictions: null,
  jurisdictionTabs: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_MY_JURISDICTIONS_SUCCESS:
      return {
        ...state,
        myJurisdictions: action.data,
      }

    case types.OPEN_JURISDICTION_TAB:
      return {
        ...state,
        jurisdictionTabs: [
          ...state.jurisdictionTabs,
          action.data,
        ],
      }

    case types.CLOSE_JURISDICTION_TAB:
      return {
        ...state,
        jurisdictionTabs: state.jurisdictionTabs.filter((jid) =>
          jid !== action.data
        ),
      }

    default:
      return state
  }
}

export default reducer
