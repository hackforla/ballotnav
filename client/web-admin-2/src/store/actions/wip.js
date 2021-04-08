import api from 'services/api'
import useActions from 'hooks/useActions'
import { auth } from 'store/selectors'
import { toast } from 'store/actions/toaster'
import { wipList } from 'store/selectors'

export const types = {
  LIST_WIPS_SUCCESS: 'wip/LIST_WIPS_SUCCESS',
  GET_WIP_SUCCESS: 'wip/GET_WIP_SUCCESS',
  UPDATE_WIP_SUCCESS: 'wip/UPDATE_WIP_SUCCESS',
  RELEASE_WIP_SUCCESS: 'wip/RELEASE_WIP_SUCCESS',
  PUBLISH_WIP_SUCCESS: 'wip/PUBLISH_WIP_SUCCESS',
  OPEN_TAB: 'wip/OPEN_TAB',
  CLOSE_TAB: 'wip/CLOSE_TAB',
}

function isAdmin(getState) {
  const { user } = auth(getState())
  if (!user) throw new Error('User not authenticated.')
  return user.role === 'admin'
}

export const listWips = () => {
  return async (dispatch, getState) => {
    const data = isAdmin(getState)
      ? await api.wip.listReleasedJurisdictions()
      : await api.wip.listMyJurisdictions()

    return dispatch({
      type: types.LIST_WIPS_SUCCESS,
      data,
    })
  }
}

export const getWip = (jid) => {
  return async (dispatch, getState) => {
    const admin = isAdmin(getState)

    const data = await (async () => {
      if (!admin) return await api.wip.getJurisdiction(jid)

      const list = wipList(getState())
      const wipListItem = list.find((wip) => wip.jurisdictionId === +jid)
      const wipJurisdictionId = wipListItem?.wipJurisdictionId
      return await api.wip.getReleasedJurisdiction(wipJurisdictionId)
    })()

    dispatch({ type: types.GET_WIP_SUCCESS, data })
    if (!admin) dispatch(listWips()) // get status update after wip converts from 'published' to 'edit in progress'
  }
}

export const updateWip = (wip) => {
  return async (dispatch) => {
    const data = await api.wip.updateJurisdiction(wip.id, wip)
    dispatch({ type: types.UPDATE_WIP_SUCCESS, data })
    dispatch(toast({ message: `Updated ${wip.name}.` }))
    dispatch(listWips()) // necessary to get status update
  }
}

export const releaseWip = (wip) => {
  return async (dispatch) => {
    const data = await api.wip.releaseJurisdiction(wip.id)
    dispatch({ type: types.RELEASE_WIP_SUCCESS, data })
    dispatch(toast({ message: `Released ${wip.name}` }))
    dispatch(listWips()) // necessary to get status update
  }
}

export const publishWip = (wip) => {
  return async (dispatch) => {
    const data = await api.wip.publishJurisdiction(wip.id)
    dispatch({ type: types.PUBLISH_WIP_SUCCESS, data })
    dispatch(toast({ message: `Released ${wip.name}` }))
    await dispatch(listWips()) // necessary to remove from wipList
  }
}

export const openTab = (jid) => ({
  type: types.OPEN_TAB,
  data: jid,
})

export const closeTab = (jid) => ({
  type: types.CLOSE_TAB,
  data: jid,
})

export default useActions.bind(null, {
  listWips,
  getWip,
  updateWip,
  releaseWip,
  publishWip,
  openTab,
  closeTab,
})

const initialState = {
  wipList: null,
  wips: {},
  tabs: [],
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LIST_WIPS_SUCCESS:
      return {
        ...state,
        wipList: action.data,
      }

    case types.GET_WIP_SUCCESS:
    case types.UPDATE_WIP_SUCCESS:
    case types.RELEASE_WIP_SUCCESS:
    case types.PUBLISH_WIP_SUCCESS:
      return {
        ...state,
        wips: {
          ...state.wips,
          [action.data.jurisdictionId]: action.data,
        },
      }

    case types.OPEN_TAB:
      return {
        ...state,
        tabs: [...state.tabs, action.data],
      }

    case types.CLOSE_TAB:
      return {
        ...state,
        tabs: state.tabs.filter((jid) => jid !== action.data),
      }

    default:
      return state
  }
}
