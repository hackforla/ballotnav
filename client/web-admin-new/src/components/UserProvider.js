import React, { useState, useEffect, useCallback } from 'react'
import Routes from './Routes'
import api from 'services/api'

function UserProvider({ children }) {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    // api.user.getUser().then(setUser)
    // console.log('setting user to null')
    // setUser(null)
    api.user.getUser().then(setUser)
  }, [])

  const login = useCallback(() => {
    api.user.login().then(setUser)
  }, [])

  const logout = useCallback(() => {
    console.log('setting user to null')
    setUser(null)
  }, [])

  if (typeof user === 'undefined') return null
  return (
    <Routes user={user} logout={logout} login={login} />
  )
}

export default UserProvider
