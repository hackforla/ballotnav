// import api from 'services/api'

export const types = {
  LOGIN: 'auth/LOGIN',
  REGISTER: 'auth/REGISTER'
}

const initialState = {
  user: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return state
    case types.REGISTER:
      return state
    default:
      return state
  }
}

export default reducer
