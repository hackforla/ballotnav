import React, { useState, useEffect, useContext, createContext } from 'react'
import api from 'services/api'

const authContext = createContext()

export function AuthProvider({ children }) {
  const auth = useProvideAuth()
  if (typeof auth.user === 'undefined') return null
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}

function useProvideAuth() {
  const [user, setUser] = useState(undefined)

  const register = ({ firstName, lastName, email, password, notes, slackName }) => {
    return api.user
      .register({
        firstName,
        lastName,
        email,
        password,
        notes,
        slackName,
      })
      .then((response) => {
        setUser(response.user)
        return response
      })
  }

  const login = ({ email, password }) => {
    return api.user
      .login({
        email,
        password,
      })
      .then((response) => {
        setUser(response.user)
        return response
      })
  }

  const logout = () => {
    return api.user.logout().then(setUser)
  }

  useEffect(() => {
    api.user.getUser().then(setUser)
  }, [])

  return {
    user,
    login,
    logout,
    register,
  }
}
