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
    headerHeight: 52,
    sidebarWidth: 500,
  },
})
