import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useRole } from 'store/selectors'
import PermanentTabs from './PermanentTabs'
import JurisdictionTabs from './JurisdictionTabs'

const VOLUNTEER_TABS = [
  {
    title: 'My Jurisdictions',
    pathname: '/jurisdictions',
  },
]

const ADMIN_TABS = [
  {
    title: 'Dashboard',
    pathname: '/dashboard',
  },
  {
    title: 'Assign',
    pathname: '/assign',
  },
  {
    title: 'Review',
    pathname: '/jurisdictions',
  },
]

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
}))

const Tabs = () => {
  const classes = useStyles()
  const { isAdmin } = useRole()
  const tabs = isAdmin ? ADMIN_TABS : VOLUNTEER_TABS

  return (
    <div className={classes.root}>
      <PermanentTabs tabs={tabs} />
      <JurisdictionTabs />
    </div>
  )
}

export default Tabs
