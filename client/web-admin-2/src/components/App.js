import React, { useEffect } from 'react'
import { useAuth } from 'store/selectors'
import useAuthActions from 'store/actions/auth'
import Auth from 'components/routers/Auth'
import Volunteer from 'components/routers/Volunteer'
import Admin from 'components/routers/Admin'

const App = () => {
  const { isChecked, user } = useAuth()
  const { getUser } = useAuthActions()

  useEffect(() => {
    if (!isChecked) getUser()
  }, [isChecked, getUser])

  if (!isChecked) return null
  if (!user) return <Auth />
  if (user.role === 'volunteer') return <Volunteer />
  if (user.role === 'admin') return <Admin />
  return null
}

export default App
