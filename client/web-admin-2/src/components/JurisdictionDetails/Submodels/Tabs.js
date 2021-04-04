import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

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
    borderBottom: `1px ${theme.palette.primary.main} solid`,
    cursor: 'default',
  },
  title: {
    fontSize: 20,
    color: theme.palette.primary.main,
    opacity: 0.3,
  },
  activeTitle: {
    opacity: 1,
  },
}))

const Tabs = ({ tabs, activeTab, onChange, }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {tabs.map((tab) => {
        const { field, title } = tab
        const isActive = tab === activeTab
        return (
          <div
            key={field}
            className={clsx(classes.tab, { [classes.activeTab]: isActive })}
            onClick={isActive ? undefined : onChange.bind(null, tab)}
          >
            <div className={clsx(classes.title, {
              [classes.activeTitle]: isActive
            })}>
              { title }
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Tabs
