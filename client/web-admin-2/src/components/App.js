import React, { useEffect } from 'react'
import { useAuth } from 'store/selectors'
import useAuthActions from 'store/actions/auth'
import Auth from 'components/routers/Auth'
import Volunteer from 'components/routers/Volunteer'
import Admin from 'components/routers/Admin'

const App = () => {
  const { user } = useAuth()
  const { getUser } = useAuthActions()

  useEffect(getUser, [getUser])

  if (typeof user === 'undefined') return null
  if (user === null) return <Auth />
  if (user.role === 'volunteer') return <Volunteer />
  if (user.role === 'admin') return <Admin />
  return null
}

export default App
