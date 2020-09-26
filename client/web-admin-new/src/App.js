import React from 'react'
import Routes from 'components/Routes'
import { AuthProvider } from 'components/use-auth'
import { ToastProvider } from 'components/use-toast'

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Routes />
      </ToastProvider>
    </AuthProvider>
  )
}

export default App
