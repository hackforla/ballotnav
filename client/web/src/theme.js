import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#1B2152',
      dark: '#040822',
      light: '#EBF3FA',
    },
    secondary: {
      main: '#FF0029',
    },
    link: {
      main: '#0819A5',
    },
    background: {
      default: '#FFF',
    },
    divider: '#CCD3DD',
    locationMarkers: {
      default: '#614799',
      selected: '#FF0029',
    },
  },
  typography: {
    fontFamily: ['Open Sans', 'sans-serif'],
  },
  breakpoints: {
    values: {
      mobile: 0,
      desktop: 960,
    },
  },
  layout: {
    headerHeight: 50,
    sidebarWidth: 500,
    pageWidth: 1134,
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        a: {
          textDecoration: 'none',
        },
        'h1, h2, h3, h4, h5, h6, p': {
          margin: 0,
          padding: 0,
        },
      }
    }
  }
})
