import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Header from './components/main/Header'
import Routes from './Routes'
import ShareModal from './components/modals/ShareModal'
import VoteDotOrgModal from './components/modals/VoteDotOrgModal'

const App = () => {
  return (
    <Router>
      <Header />
      <Routes />
      <ShareModal />
      <VoteDotOrgModal />
    </Router>
  )
}

export default App
