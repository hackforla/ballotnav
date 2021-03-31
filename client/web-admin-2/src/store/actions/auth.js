import api from 'services/api'

export const types = {
  SUBMIT: 'auth/SUBMIT',
  GET_USER: 'auth/GET_USER',
  LOGIN: 'auth/LOGIN',
  REGISTER: 'auth/REGISTER',
  LOGOUT: 'auth/LOGOUT',
}

const submit = () => {
  return { type: types.SUBMIT }
}

export const getUser = () => {
  return async (dispatch) => {
    dispatch(submit())

    const user = await api.user.getUser()

    dispatch({
      type: types.GET_USER,
      data: user,
    })
  }
}

export const register = ({
  firstName,
  lastName,
  email,
  password,
  notes,
  slackName
}) => {
  return async (dispatch) => {
    dispatch(submit())

    const { user } = await api.user.register({
      firstName,
      lastName,
      email,
      password,
      notes,
      slackName,
    })

    dispatch({
      type: types.REGISTER,
      data: user,
    })
  }
}

export const login = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(submit())

    const { user } = await api.user.login({ email, password })

    dispatch({
      type: types.LOGIN,
      data: user,
    })
  }
}

export const logout = () => {
  return async (dispatch) => {
    await api.user.logout()

    dispatch({ type: types.LOGOUT })
  }
}

const initialState = {
  isSubmitting: false,
  user: undefined
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SUBMIT:
      return {
        ...state,
        isSubmitting: true,
      }
    case types.GET_USER:
    case types.LOGIN:
    case types.REGISTER:
      return {
        ...state,
        user: action.data,
        isSubmitting: false,
      }

    case types.LOGOUT:
      return {
        ...state,
        user: null,
      }
    default:
      return state
  }
}

export default reducer
