import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    userSelect: 'none',
  },
  tab: {
    fontSize: 20,
    fontWeight: 600,
    marginRight: '2em',
    color: theme.palette.common.white,
    position: 'relative',
  },
  selected: {
    cursor: 'default',
    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: -1,
      height: 2,
      left: 0,
      right: 0,
      backgroundColor: theme.palette.secondary.main,
    }
  },
}))

const PermanentTabs = ({ tabs }) => {
  const classes = useStyles()
  const location = useLocation()

  return tabs.map((tab, index) => (
    <Link
      key={tab.pathname}
      to={tab.pathname}
      className={clsx(classes.tab, {
        [classes.selected]: tab.pathname === location.pathname
      })}
    >
      { tab.title }
    </Link>
  ))
}

export default PermanentTabs
