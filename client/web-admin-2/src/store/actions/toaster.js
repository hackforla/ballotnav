import useActions from 'hooks/useActions'

export const types = {
  TOAST: 'toaster/TOAST'
}

export const toast = (config) => ({
  type: types.TOAST,
  data: config,
})

export default useActions.bind(null, {
  toast,
})

const initialState = null

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TOAST:
      return action.data
    default:
      return state
  }
}
