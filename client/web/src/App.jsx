import React from 'react'
import { Router } from 'react-router-dom'
import Header from './components/main/Header'
import Footer from './components/main/Footer'
import Routes from './Routes'
import Modals from './components/modals'
import history from 'services/history'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: 1,
  },
})

const App = () => {
  const classes = useStyles()
  return (
    <Router history={history}>
      <div className={classes.root}>
        <Header />
        <div className={classes.content}>
          <Routes />
        </div>
        <Footer />
      </div>
      <Modals />
    </Router>
  )
}

export default App
