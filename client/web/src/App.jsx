import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Header from './components/main/Header'
import Routes from './Routes'
import ShareModal from './components/modals/ShareModal'

const App = () => {
  return (
    <Router>
      <Header />
      <Routes />
      <ShareModal />
    </Router>
  )
}

export default App
