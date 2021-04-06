import api from 'services/api'
import useActions from 'hooks/useActions'
import { toast } from 'store/actions/toaster'

export const types = {
  LIST_RELEASED_JURISDICTIONS_SUCCESS:
    'admin/LIST_RELEASED_JURISDICTIONS_SUCCESS',
  GET_RELEASED_JURISDICION_SUCCESS: 'admin/GET_RELEASED_JURISDICTION_SUCCESS',
  PUBLISH_WIP_JURISDICTION_SUCCESS: 'admin/PUBLISH_WIP_JURISDICTION_SUCCESS',
}

export const listReleasedJurisdictions = () => {
  return async (dispatch, getState) => {
    const data = await api.wip.listReleasedJurisdictions()

    dispatch({
      type: types.LIST_RELEASED_JURISDICTIONS_SUCCESS,
      data,
    })
  }
}

export const getReleasedJurisdiction = (wip) => {
  return async (dispatch) => {
    const data = await api.wip.getReleasedJurisdiction(wip.id)

    dispatch({
      type: types.GET_RELEASED_JURISDICTION_SUCCESS,
      data,
    })
  }
}

export const publishWipJurisdiction = (wip) => {
  return async (dispatch) => {
    await api.wip.publishJurisdiction(wip.id)

    dispatch({ type: types.PUBLISH_WIP_JURISDICTION_SUCCESS })
    dispatch(toast({ message: `Published ${wip.name}` }))
    dispatch(listReleasedJurisdictions())
  }
}

export default useActions.bind(null, {
  listReleasedJurisdictions,
  getReleasedJurisdiction,
  publishWipJurisdiction,
})

const initialState = {
  releasedJurisdictions: null,
  wipJurisdictions: {},
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LIST_RELEASED_JURISDICTIONS_SUCCESS:
      return {
        ...state,
        releasedJurisdictions: action.data,
      }

    case types.GET_RELEASED_JURISDICTION_SUCCESS:
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
