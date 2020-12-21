export const types = {
  OPEN_MODAL: 'OPEN_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL',
}

export const openModal = (modalId, params) => ({
  type: types.OPEN_MODAL,
  data: { modalId, params },
})

export const closeModal = (modalId) => ({
  type: types.CLOSE_MODAL,
  data: { modalId },
})

const initialState = {
  search: {
    isOpen: false,
    params: {},
  },
  share: {
    isOpen: false,
    params: {},
  },
  voteDotOrg: {
    isOpen: false,
    params: {},
  },
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.OPEN_MODAL:
      return {
        ...state,
        [action.data.modalId]: {
          isOpen: true,
          params: action.data.params,
        },
      }
    case types.CLOSE_MODAL:
      return {
        ...state,
        [action.data.modalId]: {
          isOpen: false,
          params: {},
        },
      }
    default:
      return state
  }
}

export default reducer
