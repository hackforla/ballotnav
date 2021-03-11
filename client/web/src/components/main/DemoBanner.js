import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IS_DEMO } from 'constants.js'
import { useLocation } from 'react-router'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#FA925B',
  },
  inner: {
    maxWidth: ({ isMap }) => (isMap ? undefined : theme.layout.pageWidth),
    display: 'flex',
    alignItems: 'center',
    padding: '12px 20px',
    fontWeight: 700,
    fontSize: 16,
    color: '#1B2152',
    minHeight: 62,
    margin: '0 auto',
  },
}))

const DemoBanner = () => {
  const { pathname } = useLocation()
  const classes = useStyles({
    isMap: pathname === '/map',
  })

  if (!IS_DEMO) return null
  return (
    <div className={classes.root}>
      <div className={classes.inner}>
        Please be aware that you are navigating a Demo with limited functions,
        since no current elections are going on.
      </div>
    </div>
  )
}

export default DemoBanner
