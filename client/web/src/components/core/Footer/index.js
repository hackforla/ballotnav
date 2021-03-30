import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import useBreakpoints from 'hooks/useBreakpoints'
import Links from './Links'
import Share from './Share'
import Copyright from './Copyright'

const Desktop = withStyles((theme) => ({
  root: {
    height: 156,
    padding: 25,
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    fontSize: '1em',
  },
  content: {
    margin: '0 auto',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: theme.layout.pageWidth,
  },
}))(({ classes }) => (
  <div className={classes.root}>
    <div className={classes.content}>
      <Links />
      <Share />
      <Copyright />
    </div>
  </div>
))

const Mobile = withStyles((theme) => ({
  root: {
    padding: '2em',
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    fontSize: '0.8em',
    '& > *:not(:last-child)': {
      marginBottom: '2em',
    },
  },
}))(({ classes }) => (
  <div className={classes.root}>
    <Links />
    <Share />
    <Copyright />
  </div>
))

const Footer = ({ hidden = false }) => {
  const { isMobile } = useBreakpoints()
  return (
    <div style={{ display: hidden ? 'none' : 'block' }}>
      {isMobile ? <Mobile /> : <Desktop />}
    </div>
  )
}

export default Footer
