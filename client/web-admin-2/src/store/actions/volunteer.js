import api from 'services/api'

export const types = {
  GET_MY_JURISDICTIONS_SUCCESS: 'volunteer/GET_MY_JURISDICTIONS_SUCCESS',
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

const initialState = {
  myJurisdictions: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_MY_JURISDICTIONS_SUCCESS:
      return {
        ...state,
        myJurisdictions: action.data,
      }

    default:
      return state
  }
}

export default reducer
