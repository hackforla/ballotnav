import useActions from 'hooks/useActions'
import api from 'services/api'

export const types = {
  GET_JURISDICTIONS_SUCCESS: 'assignment/GET_JURISDICTIONS_SUCCESS',
  GET_ASSIGNMENT_SUCCESS: 'assignment/GET_ASSIGNMENT_SUCCESS',
}

export const getJurisdictions = () => {
  return async (dispatch) => {
    const data = await api.assignment.listAllJurisdictions()

    dispatch({
      type: types.GET_JURISDICTIONS_SUCCESS,
      data,
    })
  }
}

export const getAssignment = () => {
  return async (dispatch) => {
    const [jurisdictions, volunteers] = await Promise.all([
      api.assignment.listAllJurisdictions(),
      api.assignment.listAllVolunteers(),
    ])

    dispatch({
      type: types.GET_ASSIGNMENT_SUCCESS,
      data: {
        ...jurisdictions,
        volunteers,
      }
    })
  }
}

export default useActions.bind(null, {
  getJurisdictions,
  getAssignment,
})

const initialState = {
  jurisdictions: null,
  volunteers: null,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_JURISDICTIONS_SUCCESS:
      return {
        ...state,
        jurisdictions: action.data
      }

    case types.GET_ASSIGNMENT_SUCCESS:
      return action.data

    default:
      return state
  }
}
