import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from 'theme/materialUI'
import Toast from 'components/Toast'
import Header from 'components/Header'
import Home from 'components/Home'
import Register from 'components/auth/Register'
import Login from 'components/auth/Login'
import ForgotPassword from 'components/auth/ForgotPassword'
import ResetPassword from 'components/auth/ResetPassword'
import ConfirmEmail from 'components/auth/ConfirmEmail'
import { makeStyles } from '@material-ui/core/styles'
import api from 'services/api'

const useStyles = makeStyles({
  mainContent: {
    margin: '0',
    paddingBottom: '50px',
    overflowY: 'scroll',
    flexGrow: 1,
  },
})

function App() {
  const [user, setUser] = useState(undefined)
  const [toast, setToast] = useState({ message: '' })
  const classes = useStyles()

  useEffect(() => {
    api.user.getUser().then(setUser)
  }, [])

  if (typeof user === 'undefined') return null

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch className={classes.mainContent}>
          <Route exact path="/">
            <Header user={user} setUser={setUser} setToast={setToast} />
            <Home user={user} />
          </Route>
          <Route path="/register">
            <Register setUser={setUser} setToast={setToast} />
          </Route>
          <Route path="/confirm/:token">
            <ConfirmEmail setToast={setToast} />
          </Route>
          <Route path="/login/:email?">
            <Login user={user} setUser={setUser} setToast={setToast} />
          </Route>
          <Route path="/forgotpassword/:email?">
            <ForgotPassword setToast={setToast} />
          </Route>
          <Route path="/resetPassword/:token">
            <ResetPassword setToast={setToast} />
          </Route>
        </Switch>
        <Toast toast={toast} setToast={setToast} />
      </Router>
    </ThemeProvider>
  )
}

export default App
