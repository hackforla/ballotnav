import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import history from 'services/history'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from 'theme'
import hotjar from 'services/hotjar'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import 'styles/styles.scss'
import store from 'store'
import App from './App'

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ConnectedRouter basename={process.env.PUBLIC_URL} history={history}>
        <App />
      </ConnectedRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)

hotjar.initialize()
