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
  },
  typography: {
    fontFamily: [
      'Open Sans',
    ],
  },
})
