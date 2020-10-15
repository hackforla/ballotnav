import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import DrawerMenu from './DrawerMenu'

const DRAWER_WIDTH = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    height: 75,
  },
  content: {
    flexGrow: 1,
    position: 'relative',
    padding: theme.spacing(3),
  },
}))

export default function PersistentDrawerRight({ children }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <div className={classes.drawerHeader} />
        {children}
      </main>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={true}
        classes={{ paper: classes.drawerPaper }}
      >
        <div className={classes.drawerHeader} />
        <DrawerMenu />
      </Drawer>
    </div>
  )
}
