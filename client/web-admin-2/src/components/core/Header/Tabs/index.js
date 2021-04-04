import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useAuth } from 'store/selectors'
import PermanentTabs from './PermanentTabs'
import JurisdictionTabs from './JurisdictionTabs'

const VOLUNTEER_TABS = [{
  pathname: '/jurisdictions',
  title: 'My Jurisdictions',
}]

const ADMIN_TABS = []

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
}))

const Tabs = () => {
  const classes = useStyles()
  const { user } = useAuth()
  const isAdmin = user.role === 'admin'

  return (
    <div className={classes.root}>
      {isAdmin ? (
        <PermanentTabs tabs={ADMIN_TABS} />
      ) : (
        <>
          <PermanentTabs tabs={VOLUNTEER_TABS} />
          <JurisdictionTabs />
        </>
      )}
    </div>
  )
}

export default Tabs
