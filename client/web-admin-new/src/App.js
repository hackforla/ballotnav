import React from 'react'
import { AuthProvider } from 'components/use-auth'
import { ToastProvider } from 'components/use-toast'
import Main from 'components/Main'

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Main />
      </ToastProvider>
    </AuthProvider>
  )
}

export default App
