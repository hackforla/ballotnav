import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useAuth } from 'store/selectors'
import useAuthActions from 'store/actions/auth'
import Auth from './Auth'
import Dashboard from './Dashboard'

const App = () => {
  const { user } = useAuth()
  const { getUser } = useAuthActions()

  useEffect(getUser, [getUser])

  if (typeof user === 'undefined') return null
  return (
    <Router>
      {user ? <Dashboard /> : <Auth />}
    </Router>
  )
}

export default App
