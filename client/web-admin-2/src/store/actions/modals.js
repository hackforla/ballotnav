import useActions from 'hooks/useActions'

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
  map: {
    isOpen: false,
    params: {},
  },
  map2: {
    isOpen: false,
    params: {},
  },
}

export default useActions.bind(null, {
  openModal,
  closeModal,
})

export const reducer = (state = initialState, action) => {
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
