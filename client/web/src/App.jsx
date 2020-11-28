import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/main/Header'
import Routes from './Routes'
import Modals from './components/modals'

const App = () => {
  return (
    <Router>
      <Header />
      <Routes />
      <Modals />
    </Router>
  )
}

export default App
