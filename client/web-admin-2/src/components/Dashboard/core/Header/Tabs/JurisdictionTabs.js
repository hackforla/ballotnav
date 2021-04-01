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
    color: theme.palette.primary.main,
    fontSize: '1em',
    fontWeight: 600,
    backgroundColor: theme.palette.common.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: '0.125em 0.75em',
    opacity: 0.5,
    display: 'flex',
    alignItems: 'center',
    marginRight: 2,
  },
  closeButton: {
    marginLeft: '1em',
    fontWeight: 600,
  },
  selected: {
    opacity: 1,
    cursor: 'default',
  },
}))

const JurisdictionTabs = () => {
  const classes = useStyles()
  const location = useLocation()

  const tabs = [{
    jurisdictionId: 1,
    jurisdictionName: 'Washington County',
  },{
    jurisdictionId: 2,
    jurisdictionName: 'Union County',
  }]

  return tabs.map((tab, index) => (
    <Link
      key={tab.jurisdictionId}
      to={`/jurisdiction/${tab.jurisdictionId}`}
      className={clsx(classes.tab, {
        [classes.selected]: location.pathname === `/jurisdiction/${tab.jurisdictionId}`,
      })}
    >
      { tab.jurisdictionName }
      <div className={classes.closeButton}>x</div>
    </Link>
  ))
}

export default JurisdictionTabs
