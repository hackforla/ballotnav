import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useAdminActions from 'store/actions/admin'
import { useReleasedJurisdictions } from 'store/selectors'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const ReviewJurisdictions = () => {
  const classes = useStyles()
  const releasedJurisdictions = useReleasedJurisdictions()
  const { listReleasedJurisdictions } = useAdminActions()

  useEffect(() => {
    if (!releasedJurisdictions) listReleasedJurisdictions()
  }, [releasedJurisdictions, listReleasedJurisdictions])

  return (
    <div className={classes.root}>
      ReviewJurisdictions
    </div>
  )
}

export default ReviewJurisdictions
