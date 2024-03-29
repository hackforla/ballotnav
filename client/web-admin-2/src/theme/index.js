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
    jurisdictionStatuses: {
      'Awaiting Edit': {
        text: '#FFFFFF',
        background: 'green',
      },
      'Edit in Progress': {
        text: '#041B54',
        background: '#FFD644',
      },
      'Released for Review': {
        text: '#FFFFFF',
        background: '#53A8E2',
      },
      Published: {
        text: '#FFFFFF',
        background: '#FF7144',
      },
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
      },
    },
  },
})
