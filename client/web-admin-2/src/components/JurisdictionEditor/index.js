import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useWipJurisdiction } from 'store/selectors'
import useVolunteerActions from 'store/actions/volunteer'
import JurisdictionDetails from './JurisdictionDetails'
import EditLocation from './EditLocation'

const JurisdictionEditor = ({ match: { params: { jid }, path } }) => {
  const { getWipJurisdiction } = useVolunteerActions()
  const wipJurisdiction = useWipJurisdiction(jid)

  useEffect(() => {
    if (!wipJurisdiction) getWipJurisdiction(jid)
  }, [jid, wipJurisdiction, getWipJurisdiction])

  if (!wipJurisdiction) return null
  return (
    <Switch>
      <Route exact path={path} component={JurisdictionDetails} />
      <Route path={`${path}/locations/:lid`} component={EditLocation} />
    </Switch>
  )
}

export default JurisdictionEditor