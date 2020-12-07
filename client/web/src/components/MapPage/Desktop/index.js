import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import JurisdictionSelect from 'components/MapPage/shared/JurisdictionSelect'
import VerifyAlert from '../shared/VerifyAlert'
import Map from '../shared/Map'
import Sidebar from './Sidebar'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    position: 'relative',
    flex: 1,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: theme.layout.sidebarWidth,
  },
  map: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: theme.layout.sidebarWidth,
    right: 0,
  },
}))

const Desktop = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <JurisdictionSelect />
      <VerifyAlert />
      <div className={classes.main}>
        <div className={classes.sidebar}>
          <Sidebar />
        </div>
        <div className={classes.map}>
          <Map />
        </div>
      </div>
    </div>
  )
}

export default Desktop
