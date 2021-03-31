import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useAuth } from 'store/selectors'
import { getUser } from 'store/actions/auth'
import Auth from './Auth'
import Dashboard from './Dashboard'

const App = () => {
  const { user } = useAuth()
  const dispatch = useDispatch()

  useEffect(() => dispatch(getUser()), [dispatch])

  if (typeof user === 'undefined') return null
  return <Router>{user ? <Dashboard /> : <Auth />}</Router>
}

export default App
