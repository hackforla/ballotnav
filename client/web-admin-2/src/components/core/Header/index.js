import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Top from './Top'
import Tabs from './Tabs'

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.common.white,
    backgroundColor: '#041B54',
    height: theme.layout.headerHeight,
    userSelect: 'none',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  inner: {
    margin: '0 3em',
    paddingTop: '1em',
    width: theme.layout.pageWidth,
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
}))

const Header = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.inner}>
        <Top />
        <Tabs />
      </div>
    </div>
  )
}

export default Header
