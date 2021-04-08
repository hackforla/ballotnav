import useActions from 'hooks/useActions'
import api from 'services/api'

export const types = {
  GET_JURISDICTIONS_SUCCESS: 'dashboard/GET_JURISDICTIONS_SUCCESS',
}

export const getJurisdictions = () => {
  return async (dispatch) => {
    const data = await api.dashboard.getJurisdictions()

    dispatch({
      type: types.GET_JURISDICTIONS_SUCCESS,
      data,
    })
  }
}

export default useActions.bind(null, {
  getJurisdictions,
})

const initialState = {
  jurisdictions: null,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_JURISDICTIONS_SUCCESS:
      return {
        ...state,
        jurisdictions: action.data,
      }

    default:
      return state
  }
}
