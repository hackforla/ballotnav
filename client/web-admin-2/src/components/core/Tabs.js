import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { identity } from 'services/utils'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    userSelect: 'none',
  },
  tab: {
    paddingRight: '2em',
    cursor: 'pointer',
  },
  activeTab: {
    position: 'relative',
    cursor: 'default',
    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: -1,
      left: 0,
      right: 0,
      height: 1,
      backgroundColor: theme.palette.primary.main,
    },
  },
  title: {
    fontSize: 20,
    color: theme.palette.primary.main,
    opacity: 0.3,
    whiteSpace: 'nowrap',
  },
  activeTitle: {
    opacity: 1,
  },
}))

const Tabs = ({ tabs, activeTab, onChange, renderTitle = identity }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {tabs.map((tab, index) => {
        const isActive = tab === activeTab
        return (
          <div
            key={index}
            className={clsx(classes.tab, { [classes.activeTab]: isActive })}
            onClick={isActive ? undefined : onChange.bind(null, tab)}
          >
            <div className={clsx(classes.title, {
              [classes.activeTitle]: isActive
            })}>
              { renderTitle(tab) }
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Tabs
