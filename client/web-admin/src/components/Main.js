import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useAuth } from 'components/use-auth'
import Auth from './Auth'
import Dashboard from './Dashboard'

function Main() {
  const { user } = useAuth()
  return <Router>{user ? <Dashboard /> : <Auth />}</Router>
}

export default Main
