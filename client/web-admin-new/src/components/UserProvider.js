import React, { useState, useEffect, useCallback } from 'react'
import Routes from './Routes'
import api from 'services/api'

function UserProvider({ children }) {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    // api.user.getUser().then(setUser)
    setUser('hello')
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  if (typeof user === 'undefined') return null
  return (
    <Routes user={user} logout={logout} />
  )
}

export default UserProvider
