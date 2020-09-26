import React from 'react'
import Routes from 'components/Routes'
import { AuthProvider } from 'components/use-auth'

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}

export default App
