export const types = {
  TOAST: 'toaster/TOAST'
}

export const toast = (config) => ({
  type: types.TOAST,
  data: config,
})

const initialState = null

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TOAST:
      return action.data
    default:
      return state
  }
}

export default reducer
