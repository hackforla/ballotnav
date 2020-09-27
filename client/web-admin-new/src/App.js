import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import theme from './theme'
import { AuthProvider } from 'components/use-auth'
import { ToastProvider } from 'components/use-toast'
import Main from 'components/Main'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <ToastProvider>
          <Main />
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
