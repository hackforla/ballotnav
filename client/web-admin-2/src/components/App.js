import React, { useEffect } from 'react'
import { useAuth } from 'store/selectors'
import useAuthActions from 'store/actions/auth'
import Auth from 'components/routers/Auth'
import Volunteer from 'components/routers/Volunteer'
import Admin from 'components/routers/Admin'

const App = () => {
  const { authChecked, user } = useAuth()
  const { getUser } = useAuthActions()

  useEffect(() => {
    if (!authChecked) getUser()
  }, [authChecked, getUser])

  if (!authChecked) return null

  switch (user?.role) {
    case 'volunteer':
      return <Volunteer />
    case 'admin':
      return <Admin />
    default:
      return <Auth />
  }
}

export default App
