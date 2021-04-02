import api from 'services/api'
import { toast } from 'store/actions/toaster'
import useActions from 'hooks/useActions'

export const types = {
  SUBMIT: 'auth/SUBMIT',
  CLEAR_SUBMIT: 'auth/CLEAR_SUBMIT',
  GET_USER: 'auth/GET_USER',
  LOGIN: 'auth/LOGIN',
  REGISTER: 'auth/REGISTER',
  LOGOUT: 'auth/LOGOUT',
}

const submit = () => ({ type: types.SUBMIT })
const clearSubmit = () => ({ type: types.CLEAR_SUBMIT })

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

    try {
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
    } catch(error) {

      dispatch(toast({
        severity: 'error',
        autoHideDuration: 3000,
        message: (() => {
          if (error.duplicateEmail) return 'email already registered'
          return 'unknown error creating account'
        })()
      }))

      dispatch(clearSubmit())
    }
  }
}

export const login = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(submit())

    try {
      const { user } = await api.user.login({ email, password })

      dispatch({
        type: types.LOGIN,
        data: user,
      })
    } catch(error) {

      dispatch(toast({
        severity: 'error',
        autoHideDuration: 3000,
        message: (() => {
          if (error.emailNotFound) return 'email not found'
          if (error.passwordInvalid) return 'password invalid'
          return 'server error'
        })()
      }))

      dispatch(clearSubmit())
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    await api.user.logout()
    dispatch({ type: types.LOGOUT })
  }
}

export default useActions.bind(null, {
  getUser,
  register,
  login,
  logout,
})

const initialState = {
  isSubmitting: false,
  user: undefined
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SUBMIT:
      return {
        ...state,
        isSubmitting: true,
      }

    case types.CLEAR_SUBMIT:
      return {
        ...state,
        isSubmitting: false,
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
