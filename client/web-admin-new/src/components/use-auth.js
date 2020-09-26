import React, { useState, useEffect, useContext, createContext } from "react";
import api from 'services/api'

const authContext = createContext()

export function AuthProvider({ children }) {
  const auth = useProvideAuth()
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(authContext)
}

function useProvideAuth() {
  const [user, setUser] = useState(null)

  const login = (email, password) => {
    return api.user.login(email, password).then(setUser)
  }

  const logout = () => {
    setUser(null)
  }

  useEffect(() => {
    api.user.getUser().then(setUser)
  }, [])

  return {
    user,
    login,
    logout,
  }
}
