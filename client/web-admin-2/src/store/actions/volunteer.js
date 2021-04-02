import api from 'services/api'
import useActions from 'hooks/useActions'

export const types = {
  GET_MY_JURISDICTIONS_SUCCESS: 'volunteer/GET_MY_JURISDICTIONS_SUCCESS',
  OPEN_JURISDICTION_TAB: 'volunteer/OPEN_JURISDICTION_TAB',
  CLOSE_JURISDICTION_TAB: 'volunteer/CLOSE_JURISDICTION_TAB',
  GET_WIP_JURISDICTION_SUCCESS: 'volunteer/GET_WIP_JURISDICTION_SUCCESS',
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

export const getWipJurisdiction = (jid) => {
  return async (dispatch) => {
    const data = await api.wip.getJurisdiction(jid)

    dispatch({
      type: types.GET_WIP_JURISDICTION_SUCCESS,
      data,
    })
  }
}

export default useActions.bind(null, {
  getMyJurisdictions,
  openJurisdictionTab,
  closeJurisdictionTab,
  getWipJurisdiction,
})

const initialState = {
  myJurisdictions: null,
  jurisdictionTabs: [],
  wipJurisdictions: {},
}

export const reducer = (state = initialState, action) => {
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

    case types.GET_WIP_JURISDICTION_SUCCESS:
      return {
        ...state,
        wipJurisdictions: {
          ...state.wipJurisdictions,
          [action.data.jurisdictionId]: action.data,
        },
      }

    default:
      return state
  }
}
