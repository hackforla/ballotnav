import api from 'services/api'
import useActions from 'hooks/useActions'
import { wipList, role } from 'store/selectors'
import { toast } from 'store/actions/toaster'

export const types = {
  LIST_WIPS_SUCCESS: 'wip/LIST_WIPS_SUCCESS',
  GET_WIP_SUCCESS: 'wip/GET_WIP_SUCCESS',
  UPDATE_WIP_SUCCESS: 'wip/UPDATE_WIP_SUCCESS',
  RELEASE_WIP_SUCCESS: 'wip/RELEASE_WIP_SUCCESS',
  PUBLISH_WIP_SUCCESS: 'wip/PUBLISH_WIP_SUCCESS',
  OPEN_TAB: 'wip/OPEN_TAB',
  CLOSE_TAB: 'wip/CLOSE_TAB',
}

export const listWips = () => {
  return async (dispatch, getState) => {
    const data = role(getState()).isVolunteer
      ? await api.wip.listMyJurisdictions()
      : await api.wip.listReleasedJurisdictions()

    return dispatch({ type: types.LIST_WIPS_SUCCESS, data })
  }
}

export const getWip = (jid) => {
  return async (dispatch, getState) => {
    const state = getState()
    const { isVolunteer } = role(state)

    const data = await (async () => {
      if (isVolunteer) return await api.wip.getJurisdiction(jid)

      const list = wipList(state)
      const wipListItem = list.find((wip) => wip.jurisdictionId === +jid)
      const wipJurisdictionId = wipListItem?.wipJurisdictionId
      return await api.wip.getReleasedJurisdiction(wipJurisdictionId)
    })()

    // get status update after wip converts from 'published' to 'in progress'
    if (isVolunteer) await dispatch(listWips())

    dispatch({ type: types.GET_WIP_SUCCESS, data })
  }
}

export const updateWip = (wip) => {
  return async (dispatch) => {
    const data = await api.wip.updateJurisdiction(wip.id, wip)
    await dispatch(listWips()) // necessary to get status update

    dispatch({ type: types.UPDATE_WIP_SUCCESS, data })
    dispatch(toast({ message: `Updated ${wip.name}.` }))
  }
}

export const releaseWip = (wip) => {
  return async (dispatch) => {
    const data = await api.wip.releaseJurisdiction(wip.id)
    await dispatch(listWips()) // necessary to get status update

    dispatch({ type: types.RELEASE_WIP_SUCCESS, data })
    dispatch(toast({ message: `Released ${wip.name}` }))
  }
}

export const publishWip = (wip) => {
  return async (dispatch) => {
    const data = await api.wip.publishJurisdiction(wip.id)
    await dispatch(listWips()) // necessary to remove from wipList

    dispatch({ type: types.PUBLISH_WIP_SUCCESS, data })
    dispatch(toast({ message: `Published ${wip.name}` }))
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
