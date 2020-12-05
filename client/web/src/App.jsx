import React from 'react'
import { Router } from 'react-router-dom'
import Header from './components/main/Header'
import Routes from './Routes'
import Modals from './components/modals'
import history from 'services/history'

const App = () => {
  return (
    <Router history={history}>
      <Header />
      <Routes />
      <Modals />
    </Router>
  )
}

export default App
