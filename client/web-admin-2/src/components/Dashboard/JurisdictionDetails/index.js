import React, { useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useMyJurisdictions } from 'store/selectors'

const useStyles = makeStyles((theme) => ({
  root: {},
  heading: {
    color: theme.palette.secondary.main,
    fontWeight: 700,
    marginBottom: '1em',
  },
}))

const JurisdictionDetails = ({ match }) => {
  const classes = useStyles()
  const jurisdictions = useMyJurisdictions()
  const { jid } = match.params

  const jurisdiction = useMemo(() => {
    if (!jurisdictions) return null
    return jurisdictions.find((j) => j.id === +jid)
  }, [jurisdictions, jid])

  if (!jurisdiction) return null
  return (
    <div className={classes.root}>
      <h2 className={classes.heading}>Jurisdiction details</h2>
      <div>{ jurisdiction.name }: { jurisdiction.id }</div>
    </div>
  )
}

export default JurisdictionDetails
