import useActions from 'hooks/useActions'
import api from 'services/api'

export const types = {
  GET_ASSIGNMENT_SUCCESS: 'assignment/GET_ASSIGNMENT_SUCCESS',
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
  getAssignment,
})

const initialState = null

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ASSIGNMENT_SUCCESS:
      return action.data

    default:
      return state
  }
}
